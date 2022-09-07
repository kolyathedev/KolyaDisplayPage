import {
	Mesh,
	ShaderMaterial,
	PlaneGeometry,
	MeshStandardMaterial,
} from 'three'
import Experience from '../../Experience'
import Fragment from '../../shaders/imageShader/fragment.glsl'
import Vertex from '../../shaders/imageShader/vertex.glsl'

export default class DisplayBoard {
	constructor(name, position, rotation, source) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.resources = this.experience.resources
		this.resource = this.resources.items[source]

		this.name = name

		// this.geometry = new PlaneGeometry(3, 2, 1, 1)
		// this.backBoardGeometry = new PlaneGeometry(4, 3, 1, 1)
		// this.backBoardMaterial = new MeshStandardMaterial({
		// 	color: '#4766ff',
		// 	metalness: 0.8,
		// 	roughness: 0,
		// })

		const { x, y, z } = position
		this.x = x
		this.y = y
		this.z = z
		this.rotation = rotation

		// this.backX = x - 0.003
		// this.backY = y
		// this.backZ = z - 0.003

		// this.createGeometry()
		// this.createBackboardGeometry()
		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(name)
			this.debugFolder.close()
		}
		this.addTile()
		this.debugInit()
	}

	addTile() {
		this.model = this.resource.scene
		this.model.position.set(this.x, this.y, this.z)
		this.model.rotation.y = this.rotation
		this.model.name = this.name
		console.log(this.model)
		this.scene.add(this.model)
	}
	// createGeometry() {
	// 	// Material
	// 	this.material = new ShaderMaterial({
	// 		vertexShader: Vertex,
	// 		fragmentShader: Fragment,
	// 		uniforms: {
	// 			uTexture: { value: this.texture },
	// 		},
	// 	})

	// 	this.mesh = new Mesh(this.geometry, this.material)
	// 	this.mesh.position.set(this.x, this.y, this.z)
	// 	this.mesh.rotation.y = this.rotation
	// 	this.mesh.name = this.name
	// 	this.scene.add(this.mesh)
	// }

	// createBackboardGeometry() {
	// 	this.meshBackBoard = new Mesh(this.backBoardGeometry, this.backBoardMaterial)
	// 	this.meshBackBoard.position.set(this.backX, this.backY, this.backZ)
	// 	this.meshBackBoard.rotation.y = this.rotation
	// 	this.meshBackBoard.castShadow = true
	// 	this.meshBackBoard.scale.x = 0.9
	// 	this.meshBackBoard.scale.y = 0.9

	// 	this.scene.add(this.meshBackBoard)
	// }
	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.model.position, 'x')
				.name('x')
				.min(-20)
				.max(30)
				.step(0.1)

			this.debugFolder
				.add(this.model.position, 'y')
				.name('y')
				.min(-20)
				.max(30)
				.step(0.1)
			this.debugFolder
				.add(this.model.position, 'z')
				.name('z')
				.min(-20)
				.max(30)
				.step(0.1)
			this.debugFolder
				.add(this.model.rotation, 'y')
				.name('rotation')
				.min(-20)
				.max(30)
				.step(0.1)
			// this.debugFolder
			// 	.add(this.meshBackBoard.scale, 'y')
			// 	.name('y scale backboard')
			// 	.min(-10)
			// 	.max(10)
			// 	.step(0.1)
			// this.debugFolder
			// 	.add(this.meshBackBoard.scale, 'x')
			// 	.name('x scale backboard')
			// 	.min(-10)
			// 	.max(10)
			// 	.step(0.1)
			// this.debugFolder
			// 	.add(this.backBoardMaterial, 'metalness')
			// 	.name('metalness  backboard')
			// 	.min(0)
			// 	.max(1)
			// 	.step(0.1)
			// this.debugFolder
			// 	.add(this.backBoardMaterial, 'roughness')
			// 	.name('roughness  backboard')
			// 	.min(0)
			// 	.max(1)
			// 	.step(0.1)
		}
	}

	update() {}
}
