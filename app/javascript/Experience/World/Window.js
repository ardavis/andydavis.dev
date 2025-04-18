import * as THREE from 'three'
import Experience from "Experience";

const defaultPosX = 0.9,
      defaultPosY = 1.5,
      defaultPosZ = -0.5,
      defaultScale = 0.4

export default class Window {

  constructor() {
    this.experience = new Experience()
    // TODO: Make a wall group
    this.desk_group = this.experience.world.desk.group
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Window')
    }

    // Setup
    this.resource = this.resources.models.window

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.scale.setScalar(defaultScale)
    this.model.position.set(defaultPosX, defaultPosY, defaultPosZ)
    this.model.castShadow = true
    this.desk_group.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    // Debug
    if (this.debug.active) {
      const debugObj = { scale: 1 }
      this.debugFolder.add(debugObj, 'scale')
                      .name("Scale")
                      .min(0).max(1).step(0.001)
                      .onChange((value) => {
                        this.model.scale.setScalar(value)
                      })

      this.debugFolder.add(this.model.position, 'x')
                      .name("Pos X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.position, 'y')
                      .name("Pos Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.position, 'z')
                      .name("Pos Z")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.rotation, 'x')
                      .name("Rot X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.rotation, 'y')
                      .name("Rot Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.rotation, 'z')
                      .name("Rot Z")
                      .min(-10).max(10).step(0.001)
    }
  }
}