import Experience from "Experience"

const experience = new Experience(document.querySelector("canvas#desk_canvas"))

const myCarousel = document.querySelector('#screen_overlay')

const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  touch: false
})