import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'
import gsap from "gsap"
import Experience from "Experience"

const defaultPosX = 0,
      defaultPosY = 1.093,
      defaultPosZ = -0.20,
      defaultScale = 0.075,
      defaultScreenX = 0,
      defaultScreenY = 1.38,
      defaultScreenZ = -0.2,
      defaultInstrPosX = -3.9,
      defaultInstrPosY = 1.8,
      defaultTimePosX = -4.258,
      defaultTimePosY = 1.3

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
    this.addTextToScreen()
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
    const screen = this.model.getObjectByName("Ultrawide_Monitor_Screen_0")
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

    this.newScreen = new THREE.Mesh(geometry, material)
    this.newScreen.position.set(defaultScreenX, defaultScreenY, defaultScreenZ)
    this.newScreen.scale.setScalar(defaultScale)

    this.desk_group.add(this.newScreen)

    if (this.debug.active) {
      this.debugFolder.add(this.newScreen.position, 'x')
                      .name("Screen Pos X")
                      .min(-10).max(10).step(0.001)
      this.debugFolder.add(this.newScreen.position, 'y')
                      .name("Screen Pos Y")
                      .min(-10).max(10).step(0.001)
      this.debugFolder.add(this.newScreen.position, 'z')
                      .name("Screen Pos Z")
                      .min(-10).max(10).step(0.001)
    }
  }

  addTextToScreen() {
    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const instructionsDiv = document.createElement('div')
    instructionsDiv.textContent = "Scroll up!"
    instructionsDiv.className = 'instructions'

    const timeDiv = document.createElement('div')
    timeDiv.textContent = timeString
    timeDiv.className = 'current_time'

    this.time = new CSS2DObject(timeDiv)
    this.time.position.set(defaultTimePosX, defaultTimePosY)
    this.newScreen.add(this.time)

    this.instructions = new CSS2DObject(instructionsDiv)
    this.instructions.position.set(defaultInstrPosX, defaultInstrPosY)
    this.newScreen.add(this.instructions)

    this.textRenderer = new CSS2DRenderer()
    this.textRenderer.setSize(window.innerWidth, window.innerHeight)
    this.textRenderer.domElement.style.pointerEvents = 'none'
    this.textRenderer.domElement.style.position = 'absolute'
    this.textRenderer.domElement.style.top = '0px'
    if (!document.body.contains(this.textRenderer.domElement)) {
      document.body.appendChild(this.textRenderer.domElement)
    }
    this.fadeInTextRenderer(this.textRenderer)

    if (this.debug.active) {
      this.debugFolder.add(this.instructions.position, 'x')
                      .name("Instructions Pos X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.instructions.position, 'y')
                      .name("Instructions Pos Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.instructions.position, 'z')
                      .name("Instructions Pos Z")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.time.position, 'x')
                      .name("Time Pos X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.time.position, 'y')
                      .name("Time Pos Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(this.time.position, 'z')
                      .name("Time Pos Z")
                      .min(-10).max(10).step(0.001)
    }
  }

  // When the user zooms into the monitor, we replace the "wallpaper" with a useable
  // screen.
  showScreen() {
    this.newScreen.geometry.computeBoundingBox()
    const boundingBox = this.newScreen.geometry.boundingBox
    const corners = [
      new THREE.Vector3(boundingBox.min.x, boundingBox.max.y, 0),
      new THREE.Vector3(boundingBox.max.x, boundingBox.max.y, 0),
      new THREE.Vector3(boundingBox.max.x, boundingBox.min.y, 0),
      new THREE.Vector3(boundingBox.min.x, boundingBox.min.y, 0)
    ]
    corners.forEach(corner => this.newScreen.localToWorld(corner))

    const toScreen = (vec3) => {
      const vector = vec3.clone().project(this.experience.camera.instance)
      return {
        x: (vector.x * 0.5 + 0.5) * window.innerWidth,
        y: (-vector.y * 0.5 + 0.5) * window.innerHeight
      }
    }
    const [topLeft, topRight, bottomRight, bottomLeft] = corners.map(toScreen)
    const minX = Math.min(topLeft.x, bottomLeft.x)
    const maxX = Math.max(topRight.x, bottomRight.x)
    const minY = Math.min(topLeft.y, topRight.y)
    const maxY = Math.max(bottomLeft.y, bottomRight.y)
    const width = maxX - minX
    const height = maxY - minY

    screen_overlay.style.left = `${minX}px`
    screen_overlay.style.top = `${minY}px`
    screen_overlay.style.width = `${width}px`
    screen_overlay.style.height = `${height}px`
    screen_overlay.style.display = "block"
  }

  hideScreen() {
    screen_overlay.style.display = "none"
  }

  fadeInTextRenderer(renderer, duration = 0.5) {
    const element = renderer.domElement
    element.style.display = "block"
    return gsap.fromTo(element,
      { opacity: 0 },
      {
        opacity: 1,
        duration,
        ease: "power1.in",
      }
    )
  }

  fadeOutTextRenderer(renderer, duration = 0.5) {
    const element = renderer.domElement
    return gsap.to(element, {
      opacity: 0,
      duration,
      ease: "power1.out",
      onComplete: () => {
        element.style.display = "none"
      }
    })
  }

  update() {
    const currentStage = this.experience.currentStage

    // If the stage is START then we want to constantly re-render the text (update the current time).
    // However, if the previous stage was monitor then we need to re-create the text as it was removed on zoom.
    if ((currentStage == this.experience.stages.START) && this.textRenderer) {
      if (this.previousStage && this.previousStage == this.experience.stages.MONITOR) {
        this.addTextToScreen()
      }
      this.textRenderer.render(this.scene, this.experience.camera.instance)
    }
    else {
      this.fadeOutTextRenderer(this.textRenderer)
    }

    this.previousStage = this.experience.currentStage
  }
}