import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import Experience from '../Experience'

export default class DisplayBoard {
	constructor(name, position, rotation) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.geometry = new PlaneGeometry(3, 2, 1, 1)
		this.material = new MeshBasicMaterial({ color: 'white' })
		const { x, y, z } = position
		this.x = x
		this.y = y
		this.z = z
		this.rotation = rotation

		this.createGeometry()
		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(name)
		}
		this.debugInit()
	}

	createGeometry() {
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.position.set(this.x, this.y, this.z)
		this.mesh.rotation.y = this.rotation
		this.scene.add(this.mesh)
	}
	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.mesh.position, 'x')
				.name('x')
				.min(-10)
				.max(20)
				.step(0.1)

			this.debugFolder
				.add(this.mesh.position, 'y')
				.name('y')
				.min(-10)
				.max(20)
				.step(0.1)
			this.debugFolder
				.add(this.mesh.position, 'z')
				.name('z')
				.min(-10)
				.max(20)
				.step(0.1)
			this.debugFolder
				.add(this.mesh.rotation, 'y')
				.name('rotation')
				.min(-10)
				.max(10)
				.step(0.1)
		}
	}

	update() {}
}
