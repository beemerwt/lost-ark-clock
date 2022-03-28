
class Clock {
  constructor() {
    this.utc = Date.now();
    this.options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    this.americanDateTime = new Intl.DateTimeFormat('en-US', this.options).format;

    const date = new Date();

    // Get if we're currently in DST
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    const stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    this.isDST = date.getTimezoneOffset() < stdTimezoneOffset;

    // minutes -> ms
    this.localTimezone = date.getTimezoneOffset() * 60000;
    
    // server timezone is EST/EDT so it's -5/-4 from UTC
    this.serverTimezone = this.isDST ? (240 * 60000) : (300 * 60000);

    // then get the difference between local timezone and server timezone
    this.serverTimezone = this.localTimezone - this.serverTimezone;
  }

  getLocalTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // see: convertTime
  getLocalTime() {
    return this.convertTime(this.utc);
  }

  getServerTime() {
    return this.convertTime(this.utc + this.serverTimezone);
  }

  // see: convertTime
  getUTCTime() {
    return this.convertTime(this.utc + this.localTimezone);
  }

  // updates "utc" with the utc time since epoch
  updateTime() {
    this.utc = Date.now();
  }

  // caution: weird
  // converts the UTC time to your local time
  convertTime(ms) {
    return this.americanDateTime(ms);
  }
}