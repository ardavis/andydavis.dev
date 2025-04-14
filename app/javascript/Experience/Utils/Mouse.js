import * as THREE from 'three'
import "gsap"
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

    window.addEventListener('scroll', () => {
      const previousScrollY = this.scrollY
      this.scrollY = window.scrollY

      console.log("scrolling!")

      // If the user scrolled up ("towards" the monitor)
      if (this.scrollY > previousScrollY) {
        console.log("here we go!")
          gsap.to(
              this.experience.camera.position,
              {
                  duration: 1.5,
                  ease: "power2.inOut",
                  y: "-=0.25",
                  z: "-=1.5"
              }
          )
      }
    })
  }
}