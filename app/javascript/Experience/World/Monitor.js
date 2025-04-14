import * as THREE from 'three'
import Experience from "Experience";

const defaultPosX = 0,
      defaultPosY = 1.38,
      defaultPosZ = -0.20,
      defaultScale = 0.075

export default class Monitor {

  constructor() {
    this.experience = new Experience()
    this.desk_group = this.experience.world.desk.group
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Monitor')
    }

    // Setup
    this.resource = this.resources.models.ultrawideMonitor

    this.setModel()
    this.replaceScreen()
  }

  setModel() {
    this.model = this.resource.scene
    this.model.scale.setScalar(defaultScale)
    this.model.position.set(defaultPosX, defaultPosY, defaultPosZ)
    this.model.rotation.z = Math.PI
    this.model.castShadow = true
    this.desk_group.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.model.position, 'x')
                      .name("Pos X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.position, 'y')
                      .name("Pos Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.model.position, 'z')
                      .name("Pos Z")
                      .min(-10).max(10).step(0.001)
    }
  }

  replaceScreen() {
    // TODO: Swap the default display with my own.
    const screen = this.model.getObjectByName("Ultrawide_Monitor_Screen_0")
    console.log(screen)
    screen.visible = false // TODO: Dispose!
    const box = new THREE.Box3().setFromObject(screen)
    const size = new THREE.Vector3()
    box.getSize(size)
    const width = size.x
    const height = size.y

    const texturePack = this.resources.texturePacks["wallpaper"]
    texturePack.color.colorSpace = THREE.SRGBColorSpace

    const geometry = new THREE.PlaneGeometry(width, height)
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      metalness: 0,
      thickness: 0.05,
      opacity: 1,
      envMapIntensity: 1,
      depthWrite: false,
      depthTest: true,
      map: texturePack.color
    })

    const newScreen = new THREE.Mesh(geometry, material)
    newScreen.position.set(defaultPosX, defaultPosY, defaultPosZ)
    newScreen.scale.setScalar(defaultScale)

    this.desk_group.add(newScreen)
    console.log(newScreen)

    if (this.debug.active) {
      this.debugFolder.add(newScreen.position, 'x')
                      .name("Screen Pos X")
                      .min(-10).max(10).step(0.001)
      this.debugFolder.add(newScreen.position, 'y')
                      .name("Screen Pos Y")
                      .min(-10).max(10).step(0.001)
      this.debugFolder.add(newScreen.position, 'z')
                      .name("Screen Pos Z")
                      .min(-10).max(10).step(0.001)
    }
  }
}