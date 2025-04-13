import EventEmitter from 'Utils/EventEmitter'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16  // Sometimes 0 causes issues. 16 is a good test at 60FPS

    // Waiting 1 frame instead of calling tick immediately
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger("tick")

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}