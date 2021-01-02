import '../../style/carousel.scss'

const reflow = element => element.offsetHeight

class Carousel {
  constructor (options) {
    const defaultOptions = {
      element: null,
      height: 0,
      index: 0,
      autoplay: true,
      interval: 3000
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.initCarousel()
    this.bindCarousel()
    this.playCarousel()
  }

  initCarousel () {
    this.timer = null
    this.initCarouselContainer()
    this.initCarouselPanelsAndDots()
    this.initCarouselArrows()
  }

  initCarouselContainer () {
    this.$container = this.options.element
    this.$container.classList.add('tiny-carousel')
    this.$container.style.height = this.options.height
    const $panelContainer = document.createElement('div')
    $panelContainer.setAttribute('class', 'carousel-panels')
    this.$panelContainer = $panelContainer
    const $dotsContainer = document.createElement('ul')
    $dotsContainer.setAttribute('class', 'carousel-dots')
    this.$dotsContainer = $dotsContainer
  }

  initCarouselPanelsAndDots () {
    this.$$panels = this.$container.querySelectorAll('.carousel-panel')
    this.$$panels[this.options.index].classList.add('active')
    this.$$panels.forEach($panel => {
      // $panel.style.transitionDuration = `${this.duration}ms`
      this.$panelContainer.appendChild($panel)
      this.$dotsContainer.appendChild(this.initCarouselDot())
    })
    this.$container.appendChild(this.$panelContainer)
    this.$container.appendChild(this.$dotsContainer)
    this.$$dots = this.$container.querySelectorAll('.carousel-dot')
    this.$$dots[this.options.index].classList.add('active')
  }

  initCarouselArrows () {
    const $arrowContainer = document.createElement('div')
    $arrowContainer.setAttribute('class', 'carousel-arrows')
    const $arrowPrev = document.createElement('button')
    $arrowPrev.setAttribute('class', 'carousel-arrow arrow-prev')
    const $arrowNext = document.createElement('button')
    $arrowNext.setAttribute('class', 'carousel-arrow arrow-next')
    $arrowContainer.appendChild($arrowPrev)
    $arrowContainer.appendChild($arrowNext)
    this.$container.appendChild($arrowContainer)
  }

  initCarouselDot () {
    const $dot = document.createElement('li')
    $dot.setAttribute('class', 'carousel-dot')
    return $dot
  }

  bindCarousel () {
    this.bindCarouselArrow()
    this.bindCarouselDots()
    this.bindCarouselContainer()
  }

  bindCarouselArrow () {
    const $arrowPrev = this.$container.querySelector('.arrow-prev')
    const $arrowNext = this.$container.querySelector('.arrow-next')
    $arrowPrev.addEventListener('click', () => {
      this.setCarousel(this.getCurrentIndex(), this.getPrevIndex(), 'right')
    })
    $arrowNext.addEventListener('click', () => {
      this.setCarousel(this.getCurrentIndex(), this.getNextIndex(), 'left')
    })
  }

  bindCarouselDots () {
    this.$$dots.forEach($carouselDot => {
      $carouselDot.addEventListener('click', e => {
        const fromIndex = this.getCurrentIndex()
        const toIndex = [...this.$$dots].indexOf(e.target)
        if (fromIndex !== toIndex) {
          const direction = fromIndex > toIndex ? 'right' : 'left'
          this.setCarousel(fromIndex, toIndex, direction)
        }
      })
    })
  }

  bindCarouselContainer () {
    if (this.options.autoplay) {
      this.$container.addEventListener('mouseenter', () => {
        this.pauseCarousel()
      })
      this.$container.addEventListener('mouseleave', () => {
        this.playCarousel()
      })
    }
  }

  setCarousel (fromIndex, toIndex, direction) {
    if (!this.isAnimate) {
      this.isAnimate = true
      this.$from = this.$$panels[fromIndex]
      this.$to = this.$$panels[toIndex]
      this.direction = direction
      this.setCarouselDot(toIndex)
      this.setCarouselPanel()
    }
  }

  getCurrentIndex () {
    return [...this.$$dots].indexOf(
      this.$container.querySelector('.carousel-dot.active')
    )
  }

  getPrevIndex () {
    return (
      (this.getCurrentIndex() - 1 + this.$$dots.length) % this.$$dots.length
    )
  }

  getNextIndex () {
    return (this.getCurrentIndex() + 1) % this.$$dots.length
  }

  setCarouselPanel () {
    const type = this.direction === 'left' ? 'next' : 'prev'
    this.$to.setAttribute('class', `carousel-panel ${type}`)
    reflow(this.$to)
    this.$from.setAttribute('class', `carousel-panel active ${this.direction}`)
    this.$to.setAttribute('class', `carousel-panel ${type} ${this.direction}`)
    this.resetCarouselPanel()
  }

  resetCarouselPanel () {
    const callback = () => {
      this.$from.setAttribute('class', 'carousel-panel')
      this.$to.setAttribute('class', 'carousel-panel active')
      this.$from.removeEventListener('transitionend', callback, false)
      this.isAnimate = false
    }
    this.$from.addEventListener('transitionend', callback, false)
  }

  setCarouselDot (index) {
    this.$$dots.forEach($carouselDot => $carouselDot.classList.remove('active'))
    this.$$dots[index].classList.add('active')
  }

  pauseCarousel () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  playCarousel () {
    if (this.options.autoplay && !this.timer) {
      this.timer = setInterval(() => {
        this.setCarousel(this.getCurrentIndex(), this.getNextIndex(), 'left')
      }, this.options.interval)
    }
  }
}

export default Carousel
