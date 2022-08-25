import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		this.setGeometry()
		this.setMaterial()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new THREE.CircleGeometry(5, 64)
	}

	setMaterial() {
		this.material = new THREE.MeshBasicMaterial({
			color: 'white',
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.rotation.x = -Math.PI * 0.5
		this.mesh.receiveShadow = true
		this.scene.add(this.mesh)
	}
}
