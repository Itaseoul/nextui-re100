export const mChargeFull_Wh = 20;
export const mChargeFull_Won = 3.7;
export const mChargeFull_RunHours = 24;
export const mChargeFull_RunSeconds = 86400;
export const CalcmChargeFactor = 2.345;

// 5000mAh battery
// https://blog.naver.com/PostView.naver?blogId=bi-zdoc&logNo=222425561573&redirect=Dlog&widgetTypeCall=true&topReferer=https%3A%2F%2Fwww.google.com%2F&directAccess=false
/**
2000mAh ~ 5000mAh
ghkscndwjsfur 5v/1a
2016년 9월 17일에 스마트폰 배터리를 밤새 충전할 때의 평균 전력 소비량 = 19.2와트시(Wh) -- 2915mAh배터리 충전
*/
// 



export const convertSecToTime = (seconds: number) => {
  if (seconds < 60) {
    return '00:00:' + addZero(seconds)
  }
  if (seconds < 3600) {
    var min = Math.floor(seconds / 60)
    var sec = seconds - min * 60
    return '00:' + addZero(min) + ':' + addZero(sec)
  }
  var hours = Math.floor(seconds / 3600)
  var min = Math.floor((seconds - hours * 3600) / 60)
  var sec = seconds - hours * 3600 - min * 60
  return addZero(hours) + ':' + addZero(min) + ':' + addZero(sec)

  function addZero(num: number) {
    return ((num < 10) ? '0' : '') + num
  }
}
