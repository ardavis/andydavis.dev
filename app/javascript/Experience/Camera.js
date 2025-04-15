import * as THREE from 'three'
import gsap from "gsap"
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
    this.mouse = this.experience.mouse

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Camera')
    }

    this.cameraSettings = {
      orbit: false,
      fov: defaultFOV,
      lookX: 0, lookY: 0, lookZ: 0,
      allowMovement: false, //true
    }

    this.setInstance()
    this.setOrbitControls()
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
    this.scene.add(this.instance)

    // Debug
    if (this.debug.active) {
      this.instance.updateLookAt = () => {
        this.instance.lookAt(this.cameraSettings.lookX, this.cameraSettings.lookY, this.cameraSettings.lookZ)
      }

      this.debugFolder.add(this.cameraSettings, 'allowMovement')

      this.debugFolder.add(this.cameraSettings, 'orbit').onChange(value => {
        if (value) {
          this.setOrbitControls()

          const direction = new THREE.Vector3()
          this.instance.getWorldDirection(direction)
          const lookTarget = new THREE.Vector3()
          lookTarget.copy(this.instance.position).add(direction.multiplyScalar(10))
          this.controls.target.set(defaultLookX, defaultLookY, defaultLookZ)
          this.controls.update()

        }
        else if (this.controls) {
          this.controls.dispose()
          this.controls = null
          console.log("Camera Position:", this.instance.position)
          console.log("Camera Rotation:", this.instance.rotation)
        }
      })

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
    if (this.cameraSettings.orbit) {
      this.controls = new OrbitControls(this.instance, this.canvas)
      this.controls.enableDamping = true
    }
}

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    // TODO: Fix mouse movement while zoomed into the monitor. Or maybe disallow it entirely?
    //       Would be nice to store which "stage" we are at for viewing so we can check if
    //       zoomed into the monitor or not.
    if (this.cameraSettings.allowMovement && this.mouse) {
      this.instance.position.x = defaultPosX + this.mouse.x * this.mouse.sensitivity
      this.instance.position.y = defaultPosY + this.mouse.y * this.mouse.sensitivity
      this.instance.lookAt(defaultLookX, defaultLookY, defaultLookZ)
    }

    if (this.controls) {
      this.controls.update()
    }
  }

  moveToStartingPosition() {
    this.experience.world.monitor.hideScreen()
    const timeline = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
    })
    timeline.to(this.instance.position, { x: defaultPosX, y: defaultPosY, z: defaultPosZ }, 0)
         .to(this.instance.rotation, { x: -0.2186, y: 0, z: 0 }, 0)
  }

  moveToMonitor() {
    const timeline = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => {
        this.experience.world.monitor.showScreen()
      }
    })
    timeline.to(this.instance.position, { x: 0.004, y: 1.3216, z: 1 }, 0)
        .to(this.instance.rotation, { x: -0.016, y: 0.004, z: 0 }, 0)
  }
}