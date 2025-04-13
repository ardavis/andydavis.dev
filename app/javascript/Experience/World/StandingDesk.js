import * as THREE from 'three'
import Experience from "Experience";

export default class StandingDesk {

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Standing Desk')
    }

    // Setup
    this.resource = this.resources.models.standingDeskModel

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.castShadow = true
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
  }
}