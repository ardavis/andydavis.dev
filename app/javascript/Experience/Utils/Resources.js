import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import EventEmitter from "Utils/EventEmitter";

export default class Resources extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.texturePacks = {}
    this.models = {}
    this.toLoad = null
    this.loaded = 0

    this.setLoaders()
    this.fetchSources()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  async fetchSources() {
    // Fetch the desk data
    const response = await fetch("/api/desk")
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()

    this.toLoad = data.object_count
    this.loadTexturePacks(data.texturePacks)
    this.loadModels(data.models)
  }

  loadTexturePacks(packs) {
    packs.forEach(pack => {
      Object.entries(pack.paths).forEach(([mapType, path]) => {
        this.loaders.textureLoader.load(
          path,
          (file) => {
            this.texturePackLoaded(pack, mapType, file)
          }
        )
      })
    })
  }

  // gltf / glb
  loadModels(models) {
    models.forEach(model => {
      this.loaders.gltfLoader.load(
        model.path,
        (file) => {
          this.modelLoaded(model, file)
        }
      )
    })
  }

  modelLoaded(model, file) {
    this.models[model.name] = file
    this.loaded++

    this.checkIfFinished()
  }

  texturePackLoaded(pack, mapType, file) {
    this.texturePacks[pack.name] ||= {}
    this.texturePacks[pack.name][mapType] = file
    this.loaded++

    this.checkIfFinished()
  }

  checkIfFinished() {
    console.log(`${this.loaded} / ${this.toLoad}`)
    if (this.loaded === this.toLoad) {
      console.log(`Finished loading ${this.loaded} sources!`)
      this.trigger('ready')
    }
  }
}