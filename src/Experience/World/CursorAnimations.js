import * as THREE from 'three'
import Experience from '../Experience'

export default class CursorAnimations {
	constructor() {
		this.experience = new Experience()
		this.environment = this.experience.world.environment.environmentMap
		// this.pointLight = this.experience.world.pointLight.light
		this.camera = this.experience.camera.instance
		this.time = this.experience.time

		// For use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// Camera Animation

		// Instantiate Cursor Watcher
		this.cursorWatch()
	}

	cursorWatch() {
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
		})
	}
	update() {
		this.environment.intensity = Math.abs(3 + this.mouse.x + this.mouse.y)
		this.environment.updateMaterials()

		// this.pointLight.position.x = 30 * this.mouse.x
		// this.pointLight.intensity = 50 - Math.abs(this.mouse.y * 50)

		// this.parallaxX = this.mouse.x * 2
		// this.parallaxY = this.mouse.y * 2

		// this.camera.position.x += this.parallaxX * 0.1
		// this.camera.position.y += this.parallaxY * 0.1
	}
}
