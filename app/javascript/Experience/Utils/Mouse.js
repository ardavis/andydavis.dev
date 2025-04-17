import * as THREE from 'three'
import Experience from "Experience";

// TODO: Move all constants across classes into a constants file
const sensitivity = 0.1

export default class Mouse {

  constructor() {
    this.experience = new Experience()
    this.x = null
    this.y = null
    this.scrollY = window.scrollY
    this.sensitivity = sensitivity

    // Normalize the mouse coordinates to -1, 1
    window.addEventListener('mousemove', (event) => {
      this.x = (event.clientX / this.experience.sizes.width - 0.5) * 2
      this.y = -(event.clientY / this.experience.sizes.height - 0.5) * 2
    })

    // TODO: Check if it works with trackpads...
    // TODO: NEW FEATURE - I would LOVE if after zooming into the monitor and choosing a project, such as NASA. Then
    //       zooming out would have a different environment. Maybe stars, picture is me at NASA, etc.
    window.addEventListener('wheel', (event) => {
      if (this.experience.camera.cameraSettings.orbit) {
        return
      }
      else {
        // If the user scrolled up ("towards" the monitor)
        if (event.deltaY < 0) {
          this.experience.camera.moveToMonitor()
        }
        else if (event.deltaY > 0) {
          this.experience.camera.moveToStartingPosition()
        }
      }
    })
  }
}