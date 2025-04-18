import * as THREE from 'three'
import Experience from 'Experience'
import { PMREMGenerator } from 'three';

const defaultSunPosX = 7.5,
      defaultSunPosY = 2.8,
      defaultSunPosZ = 9.4,
      defaultEnvIntensity = 0.5

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Environment')
    }

    this.setSunLight()
    this.setEnvironmentMap()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
    this.sunLight.castShadow = true

    // TODO: Fix shadow map size!
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(defaultSunPosX, defaultSunPosY, defaultSunPosZ)
    this.scene.add(this.sunLight)

    // Debug
    if (this.debug.active) {
      // Light Helpers
      const sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
      sunLightHelper.visible = false
      this.scene.add(sunLightHelper)

      this.debugFolder
        .add(sunLightHelper, 'visible')
        .name("Enable Sun Light Helper?")

      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('Sun Light Intensity')
        .min(0).max(10).step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('Sun Light X')
        .min(-10).max(10).step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('Sun Light Y')
        .min(-10).max(10).step(0.001)

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('Sun Light Z')
        .min(-10).max(10).step(0.001)
        .min(0).max(10).step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'x')
        .name('Sun Light Rotation X')
        .min(-10).max(10).step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'y')
        .name('Sun Light Rotation Y')
        .min(-10).max(10).step(0.001)

      this.debugFolder
        .add(this.sunLight.rotation, 'z')
        .name('Sun Light Rotation Z')
        .min(-10).max(10).step(0.001)
    }
  }

  setEnvironmentMap() {

    const map = this.resources.environments.SmallEmptyRoom1
    map.mapping = THREE.EquirectangularReflectionMapping

    const pmremGenerator = new PMREMGenerator(this.experience.renderer.instance)
    const envMap = pmremGenerator.fromEquirectangular(map).texture

    this.scene.environment = envMap
    this.scene.environmentIntensity = defaultEnvIntensity

    // Debug
    if (this.debug.active) {
      this.debugFolder.add(this.scene, 'environmentIntensity')
                      .name("Environment Intensity")
                      .min(0).max(10).step(0.001)
    }
  }
}