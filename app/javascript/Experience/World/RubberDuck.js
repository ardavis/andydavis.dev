import * as THREE from 'three'
import Experience from "Experience";

const defaultPosX = -0.3,
      defaultPosY = 1.095,
      defaultPosZ = -0.3,
      defaultRotX = 0,
      defaultRotY = 0.8,
      defaultRotZ = 0,
      defaultScale = 0.2

export default class RubberDuck {

  constructor() {
    this.experience = new Experience()
    this.desk_group = this.experience.world.desk.group
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Rubber Duck')
    }

    // Setup
    this.resource = this.resources.models.rubberDuck

    this.setModel()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.scale.setScalar(defaultScale)
    this.model.position.set(defaultPosX, defaultPosY, defaultPosZ)
    this.model.rotation.set(defaultRotX, defaultRotY, defaultRotZ)
    this.model.castShadow = true
    this.desk_group.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log(child)
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