// 選擇時間(小時、分鐘)的 DOM 元素
const NYC_Hr_Min = document.getElementById("nyc-hr-min");
const LDN_Hr_Min = document.getElementById("ldn-hr-min");
const BKK_Hr_Min = document.getElementById("bkk-hr-min");
const TPE_Hr_Min = document.getElementById("tpe-hr-min");
const SYD_Hr_Min = document.getElementById("syd-hr-min");

// 選擇日期、月份的 DOM 元素
const NYC_date = document.getElementById("nyc-date");
const LDN_date = document.getElementById("ldn-date");
const BKK_date = document.getElementById("bkk-date");
const TPE_date = document.getElementById("tpe-date");
const SYD_date = document.getElementById("syd-date");

// 時區陣列，做為 toLocaleString(locale, option) 的 option
let timeZoneArray = [
  "America/New_York",
  "Europe/London",
  "Asia/Bangkok",
  "Asia/Taipei",
  "Australia/Sydney",
];

let localeDates = timeZoneArray.map(function (timezone) {
  let localeOption = {
    day: "numeric", // "1"
    month: "short", // "Apr"
    year: "numeric", // "2020"
    hour: "2-digit", // "00"
    minute: "2-digit", // "00"
    hour12: false, // 24 時制
    timeZone: timezone, // "America/New_York"
  };
  return new Date().toLocaleDateString("en-US", localeOption);
});

// 判斷是否為晚上，定義為晚上六點到早上六點前
function isNight(hour) {
  if (hour >= 6 && hour < 18) {
    return false;
  } else {
    return true;
  }
}

function displayClock(e) {
  // New York
  // localeDates[index] 為字串
  let NYC_Array = localeDates[0].split(",");
  // NYC_Array 為陣列 ["MMM DD", "YYYY", "00:00"]
  NYC_date.textContent = NYC_Array.splice(0, 2);
  NYC_Hr_Min.textContent = NYC_Array;
  let NYC_subArray = String(NYC_Array).split(":");
  // 若為夜晚，對紐約 timebox 加上 .night 的 class，若否則移除
  if (isNight(NYC_subArray[0])) {
    NYC_Hr_Min.parentNode.setAttribute("class", "timebox night");
  } else {
    NYC_Hr_Min.parentNode.setAttribute("class", "timebox firstbox");
  }

  // London
  let LDN_Array = localeDates[1].split(",");
  LDN_date.textContent = LDN_Array.splice(0, 2);
  LDN_Hr_Min.textContent = LDN_Array;
  let LDN_subArray = String(LDN_Array).split(":");
  if (isNight(LDN_subArray[0])) {
    LDN_Hr_Min.parentNode.setAttribute("class", "timebox night");
  } else {
    LDN_Hr_Min.parentNode.setAttribute("class", "timebox");
  }

  // Bangkok
  let BKK_Array = localeDates[2].split(",");
  BKK_date.textContent = BKK_Array.splice(0, 2);
  BKK_Hr_Min.textContent = BKK_Array;
  let BKK_subArray = String(BKK_Array).split(":");
  if (isNight(BKK_subArray[0])) {
    BKK_Hr_Min.parentNode.setAttribute("class", "timebox night");
  } else {
    BKK_Hr_Min.parentNode.setAttribute("class", "timebox");
  }

  // Taipei
  let TPE_Array = localeDates[3].split(",");
  TPE_date.textContent = TPE_Array.splice(0, 2);
  TPE_Hr_Min.textContent = TPE_Array;
  let TPE_subArray = String(TPE_Array).split(":");
  if (isNight(TPE_subArray[0])) {
    TPE_Hr_Min.parentNode.setAttribute("class", "timebox night");
  } else {
    TPE_Hr_Min.parentNode.setAttribute("class", "timebox");
  }

  // Sydney
  let SYD_Array = localeDates[4].split(",");
  SYD_date.textContent = SYD_Array.splice(0, 2);
  SYD_Hr_Min.textContent = SYD_Array;
  let SYD_subArray = String(SYD_Array).split(":");
  // 若為夜晚，對紐約 timebox 加上 .night 的 class，若否則移除
  if (isNight(SYD_subArray[0])) {
    SYD_Hr_Min.parentNode.setAttribute("class", "timebox night");
  } else {
    SYD_Hr_Min.parentNode.setAttribute("class", "timebox");
  }
}

// 一載入頁面先執行一次
displayClock();

window.setInterval(function () {
  displayClock();
  // 三秒更新一次
}, 3000);
