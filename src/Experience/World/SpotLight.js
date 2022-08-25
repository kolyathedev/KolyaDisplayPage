import Experience from '../Experience'
import { SpotLight, CameraHelper } from 'three'

export default class InteractiveSpotLight {
	constructor(name) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.debugObject = {
			color: '#4e5ed4',
		}

		this.light = new SpotLight(this.debugObject.color, 1000, 0, 0.2, 0.15, 1)

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('SpotLight')
			this.debugFolder.close()
		}

		this.createSpotLight()
		this.debugInit()
	}

	createSpotLight() {
		this.light.position.set(12.6, 23.5, 3.5)
		this.light.target.position.set(11.6, 0, 5.1)
		this.light.castShadow = true
		this.spotLightCameraHelper = new CameraHelper(this.light.shadow.camera)
		this.light.shadow.camera.near = 0.1
		this.light.shadow.camera.far = 0
		this.scene.add(this.light, this.light.target, this.spotLightCameraHelper)
	}

	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.light, 'intensity')
				.name('intensity')
				.min(0)
				.max(10000)
				.step(0.001)
			this.debugFolder
				.add(this.light.position, 'x')
				.name('x')
				.min(-30)
				.max(50)
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
			this.debugFolder
				.add(this.light.target.position, 'x')
				.name('x target')
				.min(-200)
				.max(200)
				.step(0.1)

			this.debugFolder
				.add(this.light.target.position, 'y')
				.name('y target')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder
				.add(this.light.target.position, 'z')
				.name('z target')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder
				.add(this.light, 'angle')
				.min(0)
				.max(Math.PI * 2)
				.step(0.1)
			this.debugFolder
				.add(this.light.shadow.camera, 'near')
				.min(0)
				.max(5)
				.step(0.1)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.light.color.set(this.debugObject.color)
			})
		}
	}
}
