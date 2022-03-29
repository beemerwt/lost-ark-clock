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

function getData() {
  $("#timer_data").load("https://lostarkcodex.com/us/eventcalendar/");
}

$(document).ready(async () => {
  const utcNow = $("#utcTimeNow");
  const serverNow = $("#serverTimeNow");
  const localNow = $("#localTimeNow");
  updateTimes(utcNow, serverNow, localNow); 
  
  const timers = getData();
  console.log(timers);

  setInterval(updateTimes, 1000, utcNow, serverNow, localNow);
});