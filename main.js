const date = new Date();
const clock = new Clock();

function updateTimes(utcNow, serverNow, localNow) {
  clock.updateTime();

  const localTime = clock.getLocalTime();
  const utcTime = clock.getUTCTime();
  const serverTime = clock.getServerTime();

  localNow.html(localTime);
  serverNow.html(serverTime);
  utcNow.html(utcTime);
}

$(document).ready(async () => {
  const utcNow = $("#utcTimeNow");
  const serverNow = $("#serverTimeNow");
  const localNow = $("#localTimeNow");
  updateTimes(utcNow, serverNow, localNow);
  
  

  setInterval(updateTimes, 1000, utcNow, serverNow, localNow);
});