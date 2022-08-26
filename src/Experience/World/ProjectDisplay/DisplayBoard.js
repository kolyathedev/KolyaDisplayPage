import { Mesh, ShaderMaterial, PlaneGeometry } from 'three'
import Experience from '../../Experience'
import Fragment from '../../shaders/imageShader/fragment.glsl'
import Vertex from '../../shaders/imageShader/vertex.glsl'

export default class DisplayBoard {
	constructor(name, position, rotation, texture) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.texture = texture

		this.geometry = new PlaneGeometry(3, 2, 1, 1)

		const { x, y, z } = position
		this.x = x
		this.y = y
		this.z = z
		this.rotation = rotation

		this.createGeometry()
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
		this.mesh.castShadow = true
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
