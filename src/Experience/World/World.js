import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor'
import Text from './ProjectDisplay/Text'
import InteractivePointLight from './InteractivePointLight.js'
import ProjectDisplay from './ProjectDisplay/ProjectDisplay.js'
import RectLight from './RectLight'
import InteractiveSpotLight from './SpotLight.js'
import Raycaster from '../Utils/Raycaster'
import CursorAnimations from './CursorAnimations.js'
export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Lighting
		// this.pointLight = new InteractivePointLight({ x: -0.3, y: -0.1, z: 5.8 })
		this.pointLight2 = new InteractivePointLight({ x: 11.3, y: -0.1, z: 4.6 })
		this.spotLight = new InteractiveSpotLight()
		// this.rectLight = new RectLight()

		// Wait for resources
		this.resources.on('ready', () => {
			// Landscape
			this.floor = new Floor()

			// Display Items
			this.eldiaProject = new ProjectDisplay(
				"Big Mama's Mushroom Mania",
				{ x: -4.5, y: -0.1, z: 2 },
				0.2,
				{ x: -8.6, y: 2.8, z: 2.7 },
				0.2,
				'tile1',
				0.25
			)

			this.stpProject = new ProjectDisplay(
				'StayThePath',
				{ x: -11.8, y: 0, z: 0.5 },
				-0.1,
				{ x: 0.9, y: 3.3, z: 1.9 },
				-0.2,
				'tile6'
			)

			this.spaceProject = new ProjectDisplay(
				'Space 2D/3D Portfolio',
				{ x: -12.9, y: 0, z: 2.9 },
				0.1,
				{ x: -4.7, y: 3.2, z: 2.3 },
				0.1,
				'tile5'
			)

			this.rmjProject = new ProjectDisplay(
				'Roast My Jutsu',
				{ x: -1.3, y: 0, z: -0.2 },
				-0.4,
				{ x: 4.4, y: 3.3, z: 2.5 },
				-0.4,
				'tile4'
			)

			this.forestProject = new ProjectDisplay(
				'Hyperlink Forest',
				{ x: -4.4, y: 3.6, z: 1.5 },
				-6.4,
				{ x: -1.4, y: 6.5, z: 1.7 },
				-0.2,
				'tile3'
			)
			this.environment = new Environment()

			// Bio
			this.bioHeader = new Text('Nick Gillham', { x: 8.7, y: 1, z: 3 }, -0.5, 0.7)
			this.bioText = new Text(
				'Full Stack MERN & ThreeJS Dev',
				{ x: 8.7, y: 0.1, z: 3 },
				-0.5,
				0.3
			)

			// Raycaster For Animations

			this.raycaster = new Raycaster()
			this.cursorAnimation = new CursorAnimations()
		})
	}

	update() {
		// this.pointLight.update()
		if (this.raycaster) this.raycaster.update()
		if (this.cursorAnimation) this.cursorAnimation.update()
		this.spotLight && this.spotLight.update()
	}
}
