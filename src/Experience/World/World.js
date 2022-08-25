import Experience from '../Experience.js'
import DisplayBoard from './DisplayBoard.js'
import Environment from './Environment.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup

			this.environment = new Environment()
			this.displayBoard = new DisplayBoard('1', { x: -0.9, y: 2, z: 3 }, 1)
			this.displayBoard = new DisplayBoard('2', { x: 2.3, y: 2, z: 1.7 }, -0.2)
			this.displayBoard = new DisplayBoard('3', { x: -0.9, y: -0.1, z: 3 }, 1)
			this.displayBoard = new DisplayBoard('4', { x: 2.3, y: -0.1, z: 1.7 }, -0.2)
		})
	}

	update() {}
}
