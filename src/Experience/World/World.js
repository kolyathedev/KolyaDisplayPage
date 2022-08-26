import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor'
import Text from './ProjectDisplay/Text'
import InteractivePointLight from './InteractivePointLight.js'
import ProjectDisplay from './ProjectDisplay/ProjectDisplay.js'
import RectLight from './RectLight'
import InteractiveSpotLight from './SpotLight.js'
export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Wait for resources
		this.resources.on('ready', () => {
			// Landscape
			this.floor = new Floor()

			// Lighting
			this.environment = new Environment()
			// this.pointLight = new InteractivePointLight()
			this.spotLight = new InteractiveSpotLight()
			// this.rectLight = new RectLight()

			// Display Items
			this.spaceProject = new ProjectDisplay(
				'Space Portfolio',
				{ x: -5.6, y: 1.6, z: 5.1 },
				0.8,
				this.resources.items.spaceTexture,
				{ x: -7.4, y: 3, z: 6.4 },
				0.5
			)

			this.eldiaProject = new ProjectDisplay(
				'Eldia RPG',
				{ x: 0.9, y: 1.6, z: 1.7 },
				0.2,
				this.resources.items.eldiaTexture,
				{ x: 0.1, y: 3, z: 1.6 },
				0.1
			)

			this.rmjProject = new ProjectDisplay(
				'Roast My Jutsu',
				{ x: -2.6, y: 1.6, z: 3.2 },
				0.5,
				this.resources.items.rmjTexture,
				{ x: -3.9, y: 3, z: 3.4 },
				0.5
			)

			this.stpProject = new ProjectDisplay(
				'Stay The Path',
				{ x: 4.9, y: 1.6, z: 2 },
				-0.2,
				this.resources.items.stpTexture,
				{ x: 4, y: 3, z: 1.4 },
				-0.2
			)

			// Bio
			this.bioHeader = new Text('Nick Gillham', { x: 8.7, y: 0.1, z: 3 }, -0.5)
			this.bioText = new Text(
				'3D Javascript MERN Stack Dev ',
				{ x: 8.7, y: -0.5, z: 3 },
				-0.5
			)
		})
	}

	update() {}
}
