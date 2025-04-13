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
    this.resource = this.resources.models.standingDesk

    this.setModel()
  }

  setModel() {
    this.group = new THREE.Group()
    this.scene.add(this.group)

    this.model = this.resource.scene
    this.model.castShadow = true

    this.deskTop = this.model.getObjectByName("Object_2")
    // this.deskTop.material.color = new THREE.

    this.group.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })

    // Debug
    if (this.debug.active) {
      const debugDeskObj = { color: '#000' }
      this.debugFolder.add(this.deskTop.material, "roughness").min(0).max(1).step(0.0001)
      this.debugFolder.addColor(debugDeskObj, "color").onChange((value) => {
        this.deskTop.material.color = value
      })
    }
  }
}