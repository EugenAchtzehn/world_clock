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

let cities = [
  { date: NYC_date, hr: NYC_Hr_Min },
  { date: LDN_date, hr: LDN_Hr_Min },
  { date: BKK_date, hr: BKK_Hr_Min },
  { date: TPE_date, hr: TPE_Hr_Min },
  { date: SYD_date, hr: SYD_Hr_Min },
];

function displayClock(e) {
  for (const cityIndex in cities) {
    let city_date = cities[cityIndex].date;
    let city_Hr_Min = cities[cityIndex].hr;
    // localeDates[index] 為字串
    let city_Array = localeDates[cityIndex].split(",");
    // city_Array 為陣列 ["MMM DD", "YYYY", "00:00"]
    city_date.textContent = city_Array.splice(0, 2);
    city_Hr_Min.textContent = city_Array;
    let city_subArray = String(city_Array).split(":");
    // 若為夜晚，對城市的外框 <div> 加上 .night 的 class
    if (isNight(city_subArray[0])) {
      city_Hr_Min.parentNode.setAttribute("class", "timebox night");
    } else {
      city_Hr_Min.parentNode.setAttribute("class", "timebox");
    }
  }
}

// 一載入頁面先執行一次displayClock()
displayClock();

window.setInterval(function () {
  displayClock();
  // 三秒更新一次
}, 3000);
