import * as THREE from 'three'
import Experience from "Experience"

const texturePackName = 'wall',
      defaultPosZ = -0.5

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
    const texturePack = this.resources.texturePacks[texturePackName]
    texturePack.color.colorSpace = THREE.SRGBColorSpace
    texturePack.color.repeat.set(1.5, 1.5)
    texturePack.color.wrapS = THREE.RepeatWrapping
    texturePack.color.wrapT = THREE.RepeatWrapping
    texturePack.normal.repeat.set(1.5, 1.5)
    texturePack.normal.wrapS = THREE.RepeatWrapping
    texturePack.normal.wrapT = THREE.RepeatWrapping
    texturePack.arm.repeat.set(1.5, 1.5)
    texturePack.arm.wrapS = THREE.RepeatWrapping
    texturePack.arm.wrapT = THREE.RepeatWrapping

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
    this.mesh.position.z = defaultPosZ
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)

    // Debug
    if (this.debug.active) {
      const debugWall = { color: 'white' }
      this.debugFolder.addColor(debugWall, 'color').onChange((value) => {
        this.material.color = new THREE.Color(value)
      })

      this.debugFolder.add(this.mesh.position, 'z')
                      .name("Wall Position Z")
                      .min(-10).max(10).step(0.1)
    }
  }
}