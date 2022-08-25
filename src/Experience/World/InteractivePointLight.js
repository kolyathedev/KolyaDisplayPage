import Experience from '../Experience'
import { PointLight } from 'three'

export default class InteractivePointLight {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.debugObject = {
			color: '#100439',
		}

		this.light = new PointLight(this.debugObject.color, 10, 0, 2)

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('PointLight')
			this.debugFolder.close()
		}

		this.createPointLight()
		this.debugInit()
	}

	createPointLight() {
		this.light.position.set(6.8, 0, 5.8)
		this.scene.add(this.light)
	}

	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.light, 'intensity')
				.name('intensity')
				.min(0)
				.max(1000)
				.step(0.001)
			this.debugFolder
				.add(this.light.position, 'x')
				.name('x')
				.min(-200)
				.max(200)
				.step(0.1)

			this.debugFolder
				.add(this.light.position, 'y')
				.name('y')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder
				.add(this.light.position, 'z')
				.name('z')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.light.color.set(this.debugObject.color)
			})
		}
	}
}
