import * as THREE from 'three'
import Experience from "Experience"

const texturePackName = 'wallTexturePack'

export default class Wall {
  constructor() {
    this.experience = new Experience()
    this.debug = this.experience.debug
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Wall')
    }

    this.buildWall()
  }

  buildWall() {
    // Geometry
    this.geometry = new THREE.PlaneGeometry(10, 10, 100, 100)

    // Textures
    // const textures = {}
    // textures.color = this.resources.items.wallColorTexture
    // textures.normal = this.resources.items.wallNormalTexture
    // textures.arm = this.resources.items.wallARMTexture

    // textures.color.colorSpace = THREE.SRGBColorSpace
    // textures.color.repeat.set(1.5, 1.5)
    // textures.color.wrapS = THREE.RepeatWrapping
    // textures.color.wrapT = THREE.RepeatWrapping
    // textures.normal.repeat.set(1.5, 1.5)
    // textures.normal.wrapS = THREE.RepeatWrapping
    // textures.normal.wrapT = THREE.RepeatWrapping
    // textures.arm.repeat.set(1.5, 1.5)
    // textures.arm.wrapS = THREE.RepeatWrapping
    // textures.arm.wrapT = THREE.RepeatWrapping

    const texturePack = this.resources.texturePacks[texturePackName]

    // Material
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("white"),
      map: texturePack.color,
      aoMap: texturePack.arm,
      roughnessMap: texturePack.arm,
      metalnessMap: texturePack.arm,
      normalMap: texturePack.normal
    })

    // Mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.z = -2
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)

    // Debug
    if (this.debug.active) {
      const debugWall = { color: 'white' }
      this.debugFolder.addColor(debugWall, 'color').onChange((value) => {
        this.material.color = new THREE.Color(value)
      })

      this.debugFolder.add(this.material, 'wireframe')
    }
  }
}