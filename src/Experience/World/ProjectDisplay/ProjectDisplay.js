import Experience from '../../Experience'
import DisplayBoard from './DisplayBoard.js'
import Text from './Text.js'

export default class ProjectDisplay {
	constructor(
		name,
		boardCoords,
		boardRotation,
		headerCoords,
		headerRotation,
		source
	) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Display Content
		this.displayBoard = new DisplayBoard(name, boardCoords, boardRotation, source)

		// Header
		this.header = new Text(name, headerCoords, headerRotation, 0.3)
	}
}
