import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter {
	constructor() {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		this.objectsToTestArray = [
			this.experience.world.eldiaProject.displayBoard.mesh,
		]

		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// interactions
		this.webglStyle = document.querySelector('.webgl').style
		this.stpHovered = false
		this.eldiaHovered = false
		this.rmjHovered = false
		this.spaceHovered = false
		this.grabOpen = true

		// create Raycaster

		this.createRaycaster()

		// create event listeners
	}

	createRaycaster() {
		// this.rayOrigin = this.camera.controls.getObject().position
		// this.rayOrigin = this.camera.position
		// this.rayDirection = new THREE.Vector3(0, 0, 1)
		// this.rayDirection.normalize()

		this.raycaster = new THREE.Raycaster()
		// this.rayOrigin,
		// this.rayDirection,
		// 0,
		// 1000

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			// lol the pointer lock is locking the mouse at one coord on screen!
			this.trigger('mousemoved')
		})

		// interactions
		// do the same for other objects when ready -->

		// document.querySelector('.webgl').addEventListener('mousedown', () => {
		// 	this.grabOpen = false
		// 	this.webglStyle.cursor = 'grabbing'
		// })
		// document.querySelector('.webgl').addEventListener('mouseup', () => {
		// 	this.grabOpen = true
		// })
	}

	// showNotice(board) {
	// 	switch (board) {
	// 		case 'stonesBoard':
	// 			this.showSign = true
	// 			this.infoBox.classList.add('visible')
	// 			this.infoBox.innerHTML = 'Some weird alien rocks...'
	// 			console.log('added visible')
	// 			break

	// 		default:
	// 			break
	// 	}

	// 	setTimeout(() => {

	// 	}, 4000)
	// }

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.objectsToTestArray
		)

		if (this.intersectObjects.length) {
			console.log(this.intersectObjects[0].object.name)
		}
		// if (this.intersectObjects.length) {
		// 	this.distanceToObject = this.intersectObjects[0].object
		// 	switch (this.distanceToObject.name) {
		// 		case 'merged_tape':
		// 			this.webglStyle.cursor = 'pointer'
		// 			this.stpHovered = true
		// 			break
		// 		case 'merged_chest':
		// 			this.webglStyle.cursor = 'pointer'
		// 			this.eldiaHovered = true
		// 			break
		// 		case 'merged_gong':
		// 			this.webglStyle.cursor = 'pointer'
		// 			this.rmjHovered = true
		// 			break
		// 		case 'merged_temple_symbol':
		// 			this.webglStyle.cursor = 'pointer'
		// 			this.spaceHovered = true
		// 			break
		// 		case 'merged_dojo':
		// 			this.stpHovered = false
		// 			this.eldiaHovered = false
		// 			this.rmjHovered = false
		// 			this.spaceHovered = false

		// 			this.grabOpen && (this.webglStyle.cursor = 'grab')

		// 			break
		// 		default:
		// 			break
		// 	}
		// }
	}
}
