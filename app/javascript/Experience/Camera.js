import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import Experience from 'Experience'

const defaultFOV = 25,
      defaultNear = 0.1,
      defaultFar = 100,
      defaultPosX = 0,
      defaultPosY = 1.6,
      defaultPosZ = 1.8,
      defaultLookX = 0,
      defaultLookY = 1.2,
      defaultLookZ = 0

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.debug = this.experience.debug
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Camera')
    }

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      defaultFOV,
      this.sizes.width / this.sizes.height,
      defaultNear,
      defaultFar
    )
    this.instance.position.set(defaultPosX, defaultPosY, defaultPosZ)
    this.instance.lookAt(defaultLookX, defaultLookY, defaultLookZ)
    // this.setOrbitControls()
    this.scene.add(this.instance)

    // Debug
    if (this.debug.active) {
      this.cameraSettings = {
        fov: this.instance.fov,
        lookX: 0, lookY: 0, lookZ: 0
      }

      this.instance.updateLookAt = () => {
        this.instance.lookAt(this.cameraSettings.lookX, this.cameraSettings.lookY, this.cameraSettings.lookZ)
      }

      this.debugFolder.add(this.instance, 'fov')
        .name("Field of View")
        .min(0).max(100).step(0.01)
        .onChange((value) => {
          this.instance.fov = value
          this.instance.updateProjectionMatrix()
        })

      this.debugFolder.add(this.instance.position, 'x')
        .name("Position X")
        .min(-10).max(10).step(0.1)
      this.debugFolder.add(this.instance.position, 'y')
        .name("Position Y")
        .min(-10).max(10).step(0.1)
      this.debugFolder.add(this.instance.position, 'z')
        .name("Position Z")
        .min(-10).max(10).step(0.1)

      this.debugFolder.add(this.cameraSettings, 'lookX')
        .name("LookAt X")
        .min(-10).max(10).step(0.1)
        .onChange(this.instance.updateLookAt)
      this.debugFolder.add(this.cameraSettings, 'lookY')
        .name("LookAt Y")
        .min(-10).max(10).step(0.1)
        .onChange(this.instance.updateLookAt)
      this.debugFolder.add(this.cameraSettings, 'lookZ')
        .name("LookAt Z")
        .min(-10).max(10).step(0.1)
        .onChange(this.instance.updateLookAt)
    }
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.target.set(0, 1, 0)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    if (this.controls)
      this.controls.update()
  }
}