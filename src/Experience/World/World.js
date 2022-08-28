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
		this.pointLight = new InteractivePointLight({ x: 6.8, y: -0.1, z: 5.8 })
		this.pointLight2 = new InteractivePointLight({ x: 11.3, y: -0.1, z: 4.6 })
		// this.spotLight = new InteractiveSpotLight()
		// this.rectLight = new RectLight()

		// Wait for resources
		this.resources.on('ready', () => {
			// Landscape
			this.floor = new Floor()
			this.environment = new Environment()

			// Display Items
			this.spaceProject = new ProjectDisplay(
				'Space Portfolio',
				{ x: -6.5, y: 1.3, z: 2.8 },
				0.3,
				this.resources.items.spaceTexture,
				{ x: -8.6, y: 3.1, z: 2.5 },
				0.2
			)

			this.eldiaProject = new ProjectDisplay(
				'Eldia RPG',
				{ x: 1.8, y: 1.6, z: 1.7 },
				-0.1,
				this.resources.items.eldiaTexture,
				{ x: 0.4, y: 3.3, z: 1.4 },
				-0.2
			)

			this.rmjProject = new ProjectDisplay(
				'Roast My Jutsu',
				{ x: -2.4, y: 1.6, z: 1.6 },
				0,
				this.resources.items.rmjTexture,
				{ x: -4.3, y: 3.3, z: 1.6 },
				0.1
			)

			this.stpProject = new ProjectDisplay(
				'Stay The Path',
				{ x: 5.7, y: 1.6, z: 3.2 },
				-0.4,
				this.resources.items.stpTexture,
				{ x: 4, y: 3.3, z: 2.6 },
				-0.4
			)

			// Bio
			this.bioHeader = new Text('Nick Gillham', { x: 8.7, y: 1, z: 3 }, -0.5, 0.7)
			this.bioText = new Text(
				'JS ThreeJS MERN',
				{ x: 8.7, y: 0.1, z: 3 },
				-0.5,
				0.6
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
	}
}
