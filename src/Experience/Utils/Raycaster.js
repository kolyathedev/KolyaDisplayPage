import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'
import gsap from 'gsap'

export default class Raycaster extends EventEmitter {
	constructor() {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		this.controls = this.experience.camera.controls
		this.objectsToTestArray = [
			this.experience.world.stpProject.displayBoard.mesh,
			this.experience.world.eldiaProject.displayBoard.mesh,
			this.experience.world.rmjProject.displayBoard.mesh,
			this.experience.world.spaceProject.displayBoard.mesh,
		]

		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// interactions
		this.webglStyle = document.querySelector('.webgl').style
		this.infoBox = document.querySelector('.infoBox')
		this.stpHovered = false
		this.eldiaHovered = false
		this.rmjHovered = false
		this.spaceHovered = false
		this.grabOpen = true

		// create Raycaster
		this.createRaycaster()
	}

	createRaycaster() {
		this.raycaster = new THREE.Raycaster()

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
		})

		// interactions
		// do the same for other objects when ready -->

		document.querySelector('.webgl').addEventListener('mousedown', () => {
			this.grabOpen = false
			this.webglStyle.cursor = 'grabbing'
		})
		document.querySelector('.webgl').addEventListener('mouseup', () => {
			this.grabOpen = true
		})
	}

	showNotice(board) {
		switch (board) {
			case 'space':
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Space Portfolio'
				gsap.to(this.controls.target, {
					duration: 2,
					ease: 'power2.inOut',
					x: -6.5,
					y: 1.3,
					z: 2.8,
				})
				break
			case 'rmj':
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'rmj'
				gsap.to(this.controls.target, {
					duration: 2,
					ease: 'power2.inOut',
					x: -2.5,
					y: 1.6,
					z: 1.6,
				})
				break
			case 'eldia':
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'Eldia'
				gsap.to(this.controls.target, {
					duration: 2,
					ease: 'power2.inOut',
					x: 1.8,
					y: 1.6,
					z: 1.7,
				})
				break
			case 'stp':
				gsap.to(this.controls.target, {
					duration: 2,
					ease: 'power2.inOut',
					x: 5.7,
					y: 1.6,
					z: 3.2,
				})
				this.infoBox.classList.add('visible')
				this.infoBox.innerHTML = 'stp'
				break
			default:
				break
		}

		setTimeout(() => {
			this.infoBox.classList.remove('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 3.9906944166465905,
				y: 0.6879468680988509,
				z: 1.3662524336256123,
			})
		}, 4000)
	}

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.objectsToTestArray
		)
		// console.log(this.intersectObjects)
		if (this.intersectObjects.length > 0) {
			this.objectHit = this.intersectObjects[0].object
			switch (this.objectHit.name) {
				case 'Space Portfolio':
					this.webglStyle.cursor = 'pointer'
					this.spaceHovered = true
					this.showNotice('space')
					break
				case 'Eldia RPG':
					this.webglStyle.cursor = 'pointer'
					this.eldiaHovered = true
					this.showNotice('eldia')
					break
				case 'Roast My Jutsu':
					this.webglStyle.cursor = 'pointer'
					this.rmjHovered = true
					this.showNotice('rmj')
					break
				case 'Stay The Path':
					this.webglStyle.cursor = 'pointer'
					this.stpHovered = true
					this.showNotice('stp')
					break
				default:
					break
			}
		} else {
			this.stpHovered = false
			this.eldiaHovered = false
			this.rmjHovered = false
			this.spaceHovered = false
			this.grabOpen && (this.webglStyle.cursor = 'grab')
		}
	}
}
