import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug

		this.setGeometry()
		this.setMaterial()
		this.setMesh()

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Floor').close()
		}

		this.setDebug()
	}

	setGeometry() {
		this.geometry = new THREE.CircleGeometry(50, 14)
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			color: 'black',
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.rotation.x = -Math.PI * 0.5
		this.mesh.receiveShadow = true
		this.mesh.position.y = -2.4
		this.scene.add(this.mesh)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.mesh.position, 'y').min(-20).max(20).step(0.2)
		}
	}
}
