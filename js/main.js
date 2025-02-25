
const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],monthMin = ['','','','','','','','','','','',''],days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],daysMin = ['','','','','','',''],seasons = ['invierno','primavera','verano','otoño'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","monthFull","monthOnly","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, monthFull: getMonthName(_month, monthsName, false), monthOnly: getMonthName(_month, monthsName, false, counter), year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getMonthName(_month, monthsName, bigFirstLetter, counter) { const monthCounter = !!counter ? counter : 0; let month; _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter; _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter; return changeFirstLetter(bigFirstLetter, monthsName[month - 1]) } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}

const animItems = document.querySelectorAll(".animate-block");
if (animItems.length > 0) {
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 1.5;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        if (!animItem.classList.contains("animated")) {
          const animationDuration = 2000;
          const intervalFrequency = 100;
          let count = 0;
          let textPercent = animItem.querySelector(".point-text");
          let max = textPercent.dataset.max;
          let step = max / (animationDuration / intervalFrequency);
          let interval = setInterval(() => {
            count += step;
            textPercent.textContent = Math.floor(count) + "%";
            if (count > max) {
              clearInterval(interval);
              textPercent.textContent = max + "%";
            }
          }, intervalFrequency);
        animItem.classList.add("animated");
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }

  animOnScroll();

  window.addEventListener("scroll", animOnScroll);
  window.addEventListener("resize", animOnScroll);
}

const revBtns = document.querySelectorAll(".reviews__button");

for (let i = 0; i < revBtns.length; i++) {
  revBtns[i].addEventListener('click', function (e) {
    this.style.display = "none";
    this.parentElement.classList.add("active");
  })
}

let i = window.innerWidth;
let a = window.innerHeight;

var t = document.querySelectorAll("[data-parallax-container]"),
  e = function () {
    for (var e = 0, n = t.length; e < n; e++) {
      var r = t[e].getBoundingClientRect().top,
        o = t[e].offsetHeight;
      if (r / 1.3 < o && r > -1 * o) return t[e]
    }
  },
  n = function (t) {
    if (t)
      for (var e = t.querySelectorAll("[data-parallax-speed]"), n = 0, r = e.length; n < r; n++) {
        var o = e[n].getAttribute("data-parallax-speed"),
          s = Math.round(o * ((event.screenX - i / 2) / 10)),
          c = Math.round(o * ((event.screenY - a / 2) / 10)),
          l = (c + s) / 5;
        e[n].style.transform = "translate(" + s + "px," + c + "px) rotate(" + l + "deg)", e[n].style.WebkitTransform = "translate(" + s + "px," + c + "px) rotate(" + l + "deg)", e[n].style.MsTransform = "translate(" + s + "px," + c + "px) rotate(" + l + "deg)"
      }
  };
e() ? document.addEventListener("mousemove", (function () {
  n(e())
})) : document.removeEventListener("mousemove", (function () {
  n(e())
}));
document.addEventListener("scroll", (function () {
  e(), n(e())
}))
