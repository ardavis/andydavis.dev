import * as THREE from 'three'
import Experience from "Experience";

// TODO: Move all constants across classes into a constants file
const sensitivity = 0.1

export default class Mouse {

  constructor() {
    this.experience = new Experience()
    this.x = null
    this.y = null
    this.sensitivity = sensitivity

    // Normalize the mouse coordinates to -1, 1
    window.addEventListener('mousemove', (event) => {
      this.x = (event.clientX / this.experience.sizes.width - 0.5) * 2
      this.y = -(event.clientY / this.experience.sizes.height - 0.5) * 2
    })
  }
}