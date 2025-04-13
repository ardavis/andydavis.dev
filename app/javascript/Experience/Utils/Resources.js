import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { RGBELoader } from 'three/addons/loaders/RGBELoader'

import EventEmitter from "Utils/EventEmitter";

export default class Resources extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.texturePacks = {}
    this.models = {}
    this.environments = {}
    this.toLoad = null
    this.loaded = 0

    this.setLoaders()
    this.fetchSources()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.rgbeLoader = new RGBELoader()
    // this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  async fetchSources() {
    // Fetch the desk data
    // TODO: Rename since it's more than just a desk? Office?
    const response = await fetch("/api/desk")
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()

    this.toLoad = data.object_count
    this.loadTexturePacks(data.texturePacks)
    this.loadModels(data.models)
    this.loadEnvironments(data.environments)
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

  loadEnvironments(environments) {
    environments.forEach(environment => {
      this.loaders.rgbeLoader.load(
        environment.path,
        (file) => {
          this.environmentLoaded(environment, file)
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

  environmentLoaded(environment, file) {
    this.environments[environment.name] = file
    this.loaded++

    this.checkIfFinished()
  }

  checkIfFinished() {
    if (this.loaded === this.toLoad) {
      console.log(`Finished loading ${this.loaded} sources!`)
      this.trigger('ready')
    }
  }
}