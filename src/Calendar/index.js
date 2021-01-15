import '../../style/calendar.scss'
export default class Calendar {
  absoluteToday
  curMonth
  curYear
  firstDay
  lastDay
  firstDayOfWeek
  id = '#my-calendar'

  constructor(id) {
    if (id) {
      this.id = id
    }
    const curDate = new Date()
    this.curMonth = curDate.getMonth()
    this.curYear = curDate.getFullYear()
    this.absoluteToday = this.getToday()
    this.init(this.curMonth, this.curYear)
    this.bindEvent()
  }

  init(m, y) {
    this.curMonth = m
    this.curYear = y
    this.firstDayOfWeek = this.getFirstDayOfWeek(this.curYear, this.curMonth)
    this.lastDay = this.getlastDay(this.curYear, this.curMonth)
    this.render()
  }

  getToday() {
    const date = new Date()
    return [date.getMonth(), date.getDate(), date.getFullYear()]
  }


  setCurMonth(month) {
    this.curMonth = month
  }

  getFirstDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay()
  }

  getFirstDay() {
    return new Date(year, month, 1).getDate()
  }
  getlastDay(y, m) {
    return new Date(y, m+1, 0).getDate(); 
  }

  fillStartPosition(blankNum) {
    const frag = new DocumentFragment()
    for(let i=0; i<blankNum; i++) {
      frag.append(document.createElement('li'))
    }
    return frag
  }

  fillEndPosition(frag) {
    const tailNum = 42 - (this.firstDayOfWeek + this.lastDay)
    for (let i=0; i<tailNum; i++) {
      frag.append(document.createElement('li'))
    }
  }

  renderHead () {
    document.querySelector('.head>.left').innerHTML= `${this.curYear}年${this.curMonth+1}月`
  }

  checkToday(d) {
    const [month, date] = this.absoluteToday
    return d === date && month === this.curMonth
  }

  jumpToday() {
    const [month,, year] = this.absoluteToday
    this.init(month, year)
  }

  render() {
    const frag = this.fillStartPosition(this.firstDayOfWeek)
    for(let d=1; d<=this.lastDay; d++) {
      const dayEl = document.createElement('li')
      if (this.checkToday(d)) {
        dayEl.classList.add('today')
      }
      dayEl.innerText = d
      frag.append(dayEl)
    }
    this.fillEndPosition(frag)
    const container = document.querySelector(this.id)
    container.innerHTML = ''
    container.appendChild(frag)
    this.renderHead()
  }

  preMonth() {
    this.init(this.curMonth -1, this.curYear)
  }
  nextMonth() {
    this.init(this.curMonth +1, this.curYear)
  }

  genMonthAndYear(m, y) {
    let month = m
    let year = y
    if (month > 11) {
      month = 0
      year++
    }
    if (month < 0) {
      month = 11
      year--
    }
    return [month, year]
  }

  bindEvent () {
    const preBtn = document.querySelector('.tiny-calendar .head .right .pre')
    const nextBtn = document.querySelector('.tiny-calendar .head .right .next')
    const todayBtn = document.querySelector('.tiny-calendar .head .right .tdBtn')

    preBtn.addEventListener('click', () => {
      const [m, y] = this.genMonthAndYear(this.curMonth - 1, this.curYear)
      this.init(m, y)
    })
    nextBtn.addEventListener('click', () => {
      const [m, y] = this.genMonthAndYear(this.curMonth + 1, this.curYear)
      this.init(m, y)
    })
    todayBtn.addEventListener('click', () => {
      this.jumpToday()
    })
  }
}