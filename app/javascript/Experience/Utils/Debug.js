import GUI from 'lil-gui'

export default class Debug {

  constructor() {
    // TODO: Likely make this a toggle switch instead of a URL toggle
    this.active = window.location.hash === "#debug"

    if (this.active) {
      this.ui = new GUI()
    }
  }
}