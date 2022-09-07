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
			this.experience.world.stpProject.displayBoard.model,
			this.experience.world.eldiaProject.displayBoard.model,
			this.experience.world.rmjProject.displayBoard.model,
			this.experience.world.spaceProject.displayBoard.model,
		]

		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// interactions
		this.webglStyle = document.querySelector('.webgl').style
		this.infoBoxStp = document.querySelector('.infoBoxStp')
		this.infoBoxRmj = document.querySelector('.infoBoxRmj')
		this.infoBoxEldia = document.querySelector('.infoBoxEldia')
		this.infoBoxSpace = document.querySelector('.infoBoxSpace')
		this.stpHovered = false
		this.eldiaHovered = false
		this.rmjHovered = false
		this.spaceHovered = false
		this.noHover = false
		this.grabOpen = true

		// create Raycaster
		this.createRaycaster()

		this.smoothToSpace = () => {
			this.infoBoxSpace.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: -6.5,
				y: 1.3,
				z: 2.8,
			})
			this.infoBoxStp.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.rmjHovered = false
			this.eldiaHovered = false
			this.stpHovered = false
		}

		this.smoothToEldia = () => {
			this.infoBoxEldia.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 1.8,
				y: 1.6,
				z: 1.7,
			})
			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxStp.classList.remove('visible')
			this.spaceHovered = false
			this.rmjHovered = false
			this.stpHovered = false
		}

		this.smoothToRmj = () => {
			this.spaceHovered = false
			this.eldiaHovered = false
			this.stpHovered = false
			this.infoBoxRmj.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: -2.5,
				y: 1.6,
				z: 1.6,
			})
			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxStp.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
		}

		this.smoothToStp = () => {
			this.infoBoxStp.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 5.7,
				y: 1.6,
				z: 3.2,
			})

			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.spaceHovered = false
			this.rmjHovered = false
			this.eldiaHovered = false
		}

		this.smoothToStart = async () => {
			gsap.to(this.controls.target, {
				duration: 1,
				ease: 'power2.inOut',
				x: 3.9906944166465905,
				y: 0.6879468680988509,
				z: 1.3662524336256123,
			})
			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.infoBoxStp.classList.remove('visible')
		}
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
		document.querySelector('.webgl').addEventListener('click', () => {
			this.stpHovered && this.smoothToStp()
			this.eldiaHovered && this.smoothToEldia()
			this.rmjHovered && this.smoothToRmj()
			this.spaceHovered && this.smoothToSpace()
		})
		document.querySelector('.webgl').addEventListener('click', () => {
			this.noHover && this.smoothToStart()
		})
	}

	showNotice(board) {
		switch (board) {
			case 'Space':
				if (!this.spaceHovered) {
					this.spaceHovered = true
					this.noHover = false
				}
				break
			case 'Rmj':
				if (!this.rmjHovered) {
					this.rmjHovered = true
					this.noHover = false
				}

				break
			case 'Eldia':
				if (!this.eldiaHovered) {
					this.eldiaHovered = true
					this.noHover = false
				}
				break
			case 'Stp':
				if (!this.stpHovered) {
					this.stpHovered = true
					this.noHover = false
				}

				break
			default:
				break
		}
	}

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.objectsToTestArray
		)
		// console.log(this.intersectObjects)
		if (this.intersectObjects.length > 0) {
			this.objectHit = this.intersectObjects[0].object
			console.log(this.objectHit.name)
			switch (this.objectHit.name) {
				case 'tile5_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Space')
					break
				case 'tile1_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Eldia')
					break
				case 'tile4_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Rmj')
					break
				case 'tile6_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Stp')
					break
				default:
					break
			}
		} else {
			this.grabOpen && (this.webglStyle.cursor = 'grab')

			this.spaceHovered = false
			this.rmjHovered = false
			this.eldiaHovered = false
			this.stpHovered = false

			this.noHover = true
		}
	}
}
