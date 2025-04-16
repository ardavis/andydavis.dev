import * as THREE from 'three'
import Experience from "Experience";

const defaultPosX = -0.7,
      defaultPosY = 1.4,
      defaultPosZ = -0.5

export default class PictureFrame {

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Picture Frame')
    }

    // Setup
    this.resource = this.resources.models.pictureFrame

    this.setModel()
    this.addGlass()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.scale.setScalar(0.4)
    this.model.position.set(defaultPosX, defaultPosY, defaultPosZ)
    this.model.castShadow = true
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.model.position, 'x')
                      .name("Pos X")
                      .min(-3).max(3).step(0.1)

      this.debugFolder.add(this.model.position, 'y')
                      .name("Pos Y")
                      .min(-10).max(10).step(0.01)

      this.debugFolder.add(this.model.position, 'z')
                      .name("Pos Z")
                      .min(-10).max(10).step(0.01)
    }
  }

  addGlass() {
    const box = new THREE.Box3().setFromObject(this.model)
    const size = new THREE.Vector3()
    box.getSize(size)
    const width = size.x
    const height = size.y

    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      metalness: 0,
      transmission: 0.5,
      ior: 1.5,
      thickness: 0.05,
      envMapIntensity: 1,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: true
    })

    const glassPane = new THREE.Mesh(geometry, material)
    glassPane.position.copy(this.model.position)
    glassPane.position.z += 0.001

    this.scene.add(glassPane)

    // Debug
    this.debugFolder.add(glassPane.position, 'z')
                    .name("Glass Pos Z")
                    .min(-10).max(10).step(0.001)
  }
}