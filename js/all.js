const millisecPerMin = 60000;
const millisecPerHour = millisecPerMin * 60;

// 選擇時間(小時、分鐘)的 DOM 元素
const newYorkHour = document.getElementById("new-york-time");
const londonHour = document.getElementById("london-time");
const bangkokHour = document.getElementById("bangkok-time");
const taipeiHour = document.getElementById("taipei-time");
const sydneyHour = document.getElementById("sydney-time");

// 選擇日期、月份的 DOM 元素
const newYorkDay = document.getElementById("new-york-day");
const londonDay = document.getElementById("london-day");
const bangkokDay = document.getElementById("bangkok-day");
const taipeiDay = document.getElementById("taipei-day");
const sydneyDay = document.getElementById("sydney-day");
let hourStr = "";
let minuteStr = "";

// 幾點鐘若小於 10，前方補上 "0"
function checkDigit(date) {
  if (date.getHours() < 10) {
    hourStr = "0";
  }
}

// 將月份數字轉成英文月份簡寫
function monthStr(monthNum) {
  switch (monthNum) {
    case 0:
      return "JAN.";
    case 1:
      return "FEB.";
    case 2:
      return "MAR.";
    case 3:
      return "APR.";
    case 4:
      return "MAY";
    case 5:
      return "JUNE";
    case 6:
      return "JULY";
    case 7:
      return "AUG.";
    case 8:
      return "SEPT.";
    case 9:
      return "OCT.";
    case 10:
      return "NOV.";
    case 11:
      return "DEC.";
    default:
      return null;
  }
}

// 判斷是否為晚上，定義為晚上六點到早上六點前
function isNight(date) {
  if (date.getHours() < 6) {
    return true;
  } else if (date.getHours() >= 18) {
    return true;
  } else {
    return false;
  }
}

function renderTimeInfo() {
  // 取得本地時間
  const localDate = new Date();
  // 取得本地與 UTC 之間的分鐘差，為 -480 (GMT+8)
  const localToUTC = localDate.getTimezoneOffset();
  // 一分鐘為六萬毫秒，本地時間戳 + 差異 * 60000 = UTC 時間戳
  const stampUTC = localDate.getTime() + localToUTC * millisecPerMin;

  // 取得倫敦時間
  const dateUTC = new Date(stampUTC);

  // 一小時等於三百六十萬毫秒，紐約-5, 曼谷+7, 台北+8, 雪梨+10
  const newYorkDate = new Date(stampUTC - 5 * millisecPerHour);
  const bangkokDate = new Date(stampUTC + 7 * millisecPerHour);
  const taipeiDate = new Date(stampUTC + 8 * millisecPerHour);
  const sydneyDate = new Date(stampUTC + 10 * millisecPerHour);

  // 這幾地分鐘數不會改變(無增減半小時的狀況)，判斷一次即可
  if (dateUTC.getMinutes() < 10) {
    minuteStr = "0";
  }

  // 紐約
  checkDigit(newYorkDate);
  newYorkHour.textContent =
    hourStr +
    newYorkDate.getHours() +
    ":" +
    minuteStr +
    newYorkDate.getMinutes();
  hourStr = "";
  newYorkDay.textContent =
    newYorkDate.getDate() +
    " " +
    monthStr(newYorkDate.getMonth()) +
    " " +
    newYorkDate.getFullYear();
  // 若為夜晚，對紐約 timebox 加上 .night 的 class，若否則移除
  if (isNight(newYorkDate)) {
    newYorkHour.parentNode.setAttribute("class", "timebox night");
  } else {
    newYorkHour.parentNode.setAttribute("class", "timebox firstbox");
  }

  // 倫敦
  checkDigit(dateUTC);
  londonHour.textContent =
    hourStr + dateUTC.getHours() + ":" + minuteStr + dateUTC.getMinutes();
  hourStr = "";
  londonDay.textContent =
    dateUTC.getDate() +
    " " +
    monthStr(dateUTC.getMonth()) +
    " " +
    dateUTC.getFullYear();
  if (isNight(dateUTC)) {
    londonHour.parentNode.setAttribute("class", "timebox night");
  } else {
    londonHour.parentNode.setAttribute("class", "timebox");
  }

  // 曼谷
  checkDigit(bangkokDate);
  bangkokHour.textContent =
    hourStr +
    bangkokDate.getHours() +
    ":" +
    minuteStr +
    bangkokDate.getMinutes();
  hourStr = "";
  bangkokDay.textContent =
    bangkokDate.getDate() +
    " " +
    monthStr(bangkokDate.getMonth()) +
    " " +
    bangkokDate.getFullYear();
  if (isNight(bangkokDate)) {
    bangkokHour.parentNode.setAttribute("class", "timebox night");
  } else {
    bangkokHour.parentNode.setAttribute("class", "timebox");
  }

  // 台北
  checkDigit(taipeiDate);
  taipeiHour.textContent =
    hourStr + taipeiDate.getHours() + ":" + minuteStr + taipeiDate.getMinutes();
  hourStr = "";
  taipeiDay.textContent =
    taipeiDate.getDate() +
    " " +
    monthStr(taipeiDate.getMonth()) +
    " " +
    taipeiDate.getFullYear();
  if (isNight(taipeiDate)) {
    taipeiHour.parentNode.setAttribute("class", "timebox night");
  } else {
    taipeiHour.parentNode.setAttribute("class", "timebox");
  }

  // 雪梨
  checkDigit(sydneyDate);
  sydneyHour.textContent =
    hourStr + sydneyDate.getHours() + ":" + minuteStr + sydneyDate.getMinutes();
  hourStr = "";
  sydneyDay.textContent =
    sydneyDate.getDate() +
    " " +
    monthStr(sydneyDate.getMonth()) +
    " " +
    sydneyDate.getFullYear();
  if (isNight(sydneyDate)) {
    sydneyHour.parentNode.setAttribute("class", "timebox night");
  } else {
    sydneyHour.parentNode.setAttribute("class", "timebox");
  }

  // 歸零分鐘補零字串
  minuteStr = "";
}

// 一載入頁面先執行一次
renderTimeInfo();

window.setInterval(function () {
  renderTimeInfo();
  // 三秒更新一次
}, 3000);
