import Grid from "./grid.js"
import SubGrid from "./sub-grid.js"

/**
 * @global
 */
class Sudoku {

	/**
	 * @type {Array<Number>}
	 */
	static DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

	/**
	 * @param {Array<Array<Number>>} puzzle
	 */
	constructor(puzzle) {
		this._puzzle = puzzle
		this._grid = null
	}

	/**
	 * @returns {Array<Array<Number>>}
	 */
	solve() {
		this._grid = new Grid()
		for(let x = 0; x < this.puzzle.length; x++) {
			for(let y = 0; y < this.puzzle[x].length; y++) {
				const digit = this.puzzle[x][y]
				this.grid.addCell(x, y, digit === 0 ? null : digit)
			}
		}
		this.grid.buildSubGrids()
		this.fillNextCell()
		return this.grid.toArray()
	}

	fillNextCell() {
		const nextCells = this.grid.getAvailableCells()
		nextCells.sort((a, b) => a.getAvailableDigits().length - b.getAvailableDigits().length)
		const nextCell = nextCells[0]
		if(nextCell) {
			nextCell.digit = nextCell.getAvailableDigits()[0]
			this.fillNextCell()
		}
	}

	/**
	 * @readonly
	 * @type {Grid}
	 */
	get grid() {
		return this._grid
	}

	/**
	 * @readonly
	 * @type {Array<Array<Number>>}
	 */
	get puzzle() {
		return this._puzzle
	}

}

export default Sudoku
