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
	constructor(name, position, rotation, texture) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.texture = texture
		this.name = name

		this.geometry = new PlaneGeometry(3, 2, 1, 1)
		this.backBoardGeometry = new PlaneGeometry(4, 3, 1, 1)
		this.backBoardMaterial = new MeshStandardMaterial({
			color: 'white',
			metalness: 0.5,
			roughness: 0,
		})

		const { x, y, z } = position
		this.x = x
		this.y = y
		this.z = z
		this.rotation = rotation

		this.backX = x - 0.1
		this.backY = y
		this.backZ = z - 0.1

		this.createGeometry()
		this.createBackboardGeometry()
		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(name)
			this.debugFolder.close()
		}
		this.debugInit()
	}

	createGeometry() {
		// Material
		this.material = new ShaderMaterial({
			vertexShader: Vertex,
			fragmentShader: Fragment,
			uniforms: {
				uTexture: { value: this.texture },
			},
		})

		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.position.set(this.x, this.y, this.z)
		this.mesh.rotation.y = this.rotation
		this.mesh.name = this.name
		this.scene.add(this.mesh)
	}

	createBackboardGeometry() {
		this.meshBackBoard = new Mesh(this.backBoardGeometry, this.backBoardMaterial)
		this.meshBackBoard.position.set(this.backX, this.backY, this.backZ)
		this.meshBackBoard.rotation.y = this.rotation
		this.meshBackBoard.castShadow = true
		this.scene.add(this.meshBackBoard)
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
