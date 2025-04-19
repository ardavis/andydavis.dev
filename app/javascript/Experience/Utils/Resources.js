import * as THREE from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { RGBELoader } from 'three/addons/loaders/RGBELoader'
import { FontLoader } from 'three/addons/loaders/FontLoader'
import { FBXLoader } from 'three/addons/loaders/FBXLoader'
import EventEmitter from "Utils/EventEmitter";

export default class Resources extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.texturePacks = {}
    this.models = {}
    this.environments = {}
    this.fonts = {}
    this.toLoad = null
    this.loaded = 0

    this.setLoaders()
    this.fetchSources()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.rgbeLoader = new RGBELoader()
    this.loaders.fontLoader = new FontLoader()
    this.loaders.fbxLoader = new FBXLoader()

    const threeAddonsURL = document.querySelector("meta[name='three-addons-url']").content
    this.loaders.dracoLoader.setDecoderPath(`${threeAddonsURL}/libs/draco/`)
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
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
    this.loadEnvironments(data.environments)
    this.projects = data.projects

    if (data.fonts)
      this.loadFonts(data.fonts)
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
      let loader = null
      if (model.path.includes(".fbx")) {
        loader = this.loaders.fbxLoader
      }
      else {
        loader = this.loaders.gltfLoader
      }

      loader.load(
        model.path,
        (file) => { this.modelLoaded(model, file) },
        undefined,
        (err) => {
          console.log(`Error loading ${model.path}, retrying...`, err)
          loader.load(model.path, (file) => this.modelLoaded(model, file))
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

  loadFonts(fonts) {
    fonts.forEach(font => {
      this.loaders.fontLoader.load(
        font.path,
        (file) => {
          this.fontLoaded(font, file)
        }
      )
    })
  }

  modelLoaded(model, file) {
    this.models[model.name] = file
    this.loaded++

    this.checkIfFinished(file)
  }

  texturePackLoaded(pack, mapType, file) {
    this.texturePacks[pack.name] ||= {}
    this.texturePacks[pack.name][mapType] = file
    this.loaded++

    this.checkIfFinished(file)
  }

  environmentLoaded(environment, file) {
    this.environments[environment.name] = file
    this.loaded++

    this.checkIfFinished(file)
  }

  fontLoaded(font, file) {
    this.fonts[font.name] = file
    this.loaded++

    this.checkIfFinished(file)
  }

  checkIfFinished(file) {
    if (this.loaded === this.toLoad) {
      console.log(`Finished loading ${this.loaded} sources!`)
      this.trigger('ready')
    }
  }
}