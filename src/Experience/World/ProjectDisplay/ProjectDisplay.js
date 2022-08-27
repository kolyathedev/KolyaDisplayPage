import Experience from '../../Experience'
import DisplayBoard from './DisplayBoard.js'
import Text from './Text.js'

export default class ProjectDisplay {
	constructor(
		name,
		boardCoords,
		boardRotation,
		texture,
		headerCoords,
		headerRotation
	) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Display Content
		this.displayBoardTexture = texture
		this.displayBoard = new DisplayBoard(
			name,
			boardCoords,
			boardRotation,
			this.displayBoardTexture
		)

		// Header
		this.header = new Text(name, headerCoords, headerRotation)
	}
}
