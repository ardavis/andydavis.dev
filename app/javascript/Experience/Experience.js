import * as THREE from 'three'
import Sizes from "Utils/Sizes"
import Time from "Utils/Time"
import Mouse from "Utils/Mouse"
import Camera from "Camera"
import Renderer from 'Renderer'
import World from 'World/World'
import Resources from 'Utils/Resources'
import Debug from 'Utils/Debug'

let instance = null

export default class Experience {
  constructor(canvas) {

    // Convert this class to be a singleton, we only want one instance of an Experience
    if (instance)
      return instance

    instance = this

    // Global access
    window.experience = this

    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.mouse = new Mouse()
    this.scene = new THREE.Scene()
    this.resources = new Resources()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Debug
    if (this.debug.active) {
      const axesHelper = new THREE.AxesHelper(5);
      axesHelper.visible = false
      this.scene.add(axesHelper)
      this.debug.ui.add(axesHelper, 'visible').name("Enable Axes Helper?")
    }

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    this.time.on("tick", () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }

  // Consider adding a destroy method for each class to destroy itself.
  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // Traverse the whole scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key]

          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}