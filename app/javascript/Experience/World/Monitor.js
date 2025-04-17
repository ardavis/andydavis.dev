import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer'
import Experience from "Experience";

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

    const time = new CSS2DObject(timeDiv)
    time.position.set(defaultTimePosX, defaultTimePosY)
    this.newScreen.add(time)

    const instructions = new CSS2DObject(instructionsDiv)
    instructions.position.set(defaultInstrPosX, defaultInstrPosY)
    this.newScreen.add(instructions)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight)
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = '0px'
    if (!document.body.contains(this.labelRenderer.domElement)) {
      document.body.appendChild(this.labelRenderer.domElement)
    }

    if (this.debug.active) {
      this.debugFolder.add(instructions.position, 'x')
                      .name("Instructions Pos X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(instructions.position, 'y')
                      .name("Instructions Pos Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(instructions.position, 'z')
                      .name("Instructions Pos Z")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(time.position, 'x')
                      .name("Time Pos X")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(time.position, 'y')
                      .name("Time Pos Y")
                      .min(-10).max(10).step(0.001)

      this.debugFolder.add(time.position, 'z')
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

  update() {
    if (this.labelRenderer)
      this.labelRenderer.render(this.scene, this.experience.camera.instance)

  //   if (this.textContext) {
  //     this.textContext.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height)

  //     const now = new Date()
  //     const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  //     this.textContext.font = '20px Verdana'
  //     this.textContext.fillStyle = 'white'
  //     this.textContext.fillText(timeString, this.textCanvas.width / 2, this.textCanvas.height / 2)

  //     this.textTexture.needsUpdate = true
  //   }
  }
}