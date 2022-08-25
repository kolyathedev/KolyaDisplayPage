import * as THREE from 'three'
import Experience from '../Experience.js'
import Fog from './Fog.js'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// this.fog = new Fog()

		// Debug
		this.debug = this.experience.debug
		this.debugObject = {
			color: '#100439',
		}
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('environment')
		}

		this.setSunLight()
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
		this.sunLight.castShadow = true
		this.sunLight.shadow.camera.far = 15
		this.sunLight.shadow.mapSize.set(1024, 1024)
		this.sunLight.shadow.normalBias = 0.05
		this.sunLight.position.set(-0.114, 2.591, -4.17)
		this.scene.add(this.sunLight)

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.sunLight, 'intensity')
				.name('sunLightIntensity')
				.min(0)
				.max(10)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'x')
				.name('sunLightX')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'y')
				.name('sunLightY')
				.min(-5)
				.max(5)
				.step(0.001)

			this.debugFolder
				.add(this.sunLight.position, 'z')
				.name('sunLightZ')
				.min(-5)
				.max(5)
				.step(0.001)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.sunLight.color.set(this.debugObject.color)
			})
		}
	}
}
