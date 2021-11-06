import RelativePosition from "./relative-position.js"
import Sudoku from "./sudoku.js"

class Cell {

	constructor(x, y, digit) {
		this._x = x
		this._y = y
		this._digit = digit
		this._row = null
		this._subGrid = null
		this._neighbors = []
	}

	/**
	 * @param {Cell}
	 * @returns {RelativePosition}
	 */
	getRelativePosition(cell) {
		if (this.x === cell.x && this.y - 1 === cell.y) {
			return new RelativePosition(RelativePosition.AXIS.VERTICAL, RelativePosition.DIRECTION.BACKWARD)
		}
		if (this.x === cell.x && this.y + 1 === cell.y) {
			return new RelativePosition(RelativePosition.AXIS.VERTICAL, RelativePosition.DIRECTION.FORWARD)
		}
		if (this.x - 1 === cell.x && this.y === cell.y ) {
			return new RelativePosition(RelativePosition.AXIS.HORIZONTAL, RelativePosition.DIRECTION.BACKWARD)
		}
		if (this.x + 1 === cell.x && this.y === cell.y ) {
			return new RelativePosition(RelativePosition.AXIS.HORIZONTAL, RelativePosition.DIRECTION.FORWARD)
		}
		if (this.x - 1 === cell.x && this.y - 1 === cell.y) {
			return new RelativePosition(RelativePosition.AXIS.DIAGONAL_RIGHT, RelativePosition.DIRECTION.BACKWARD)
		}
		if (this.x + 1 === cell.x && this.y + 1 === cell.y) {
			return new RelativePosition(RelativePosition.AXIS.DIAGONAL_RIGHT, RelativePosition.DIRECTION.FORWARD)
		}
		if (this.x - 1 === cell.x && this.y + 1 === cell.y) {
			return new RelativePosition(RelativePosition.AXIS.DIAGONAL_LEFT, RelativePosition.DIRECTION.BACKWARD)
		}
		if (this.x + 1 === cell.x && this.y - 1 === cell.y) {
			return new RelativePosition(RelativePosition.AXIS.DIAGONAL_LEFT, RelativePosition.DIRECTION.FORWARD)
		}
		return null
	}

	/**
	 * @returns {Array<Number>}
	 */
	getAvailableDigits() {
		const axisDigits = this.getUsedDigits()
		const subGridDigits = this.subGrid.getUsedDigits()
		const digits = axisDigits.concat(subGridDigits)
		return Sudoku.DIGITS.filter(digit => !digits.includes(digit))
	}

	/**
	 * @returns {Array<Number>}
	 */
	getUsedDigits() {
		const horizontalAxisCells = this.getAxisCells(RelativePosition.AXIS.HORIZONTAL)
		const verticalAxisCells = this.getAxisCells(RelativePosition.AXIS.VERTICAL)
		const cells = horizontalAxisCells.concat(verticalAxisCells)
		return cells.map(cell => cell.digit)
	}

	/**
	 * @param {Axis}    axis
	 * @param {string} [path]
	 * @param {string} [axisCells=[]]
	 * @returns {Cell[]}
	 * @example getAxisCells(RelativePosition.AXIS.VERTICAL)
	 */
	getAxisCells(axis, path = [], axisCells = []) {
		if(axisCells.length === 0) {
			axisCells.push(this)
		}
		path.push(this)
		this.neighbors.filter(neighbor => neighbor.relativePosition.axis === axis && path.includes(neighbor.cell) === false).forEach(neighbor => {
			axisCells.push(neighbor.cell)
			axisCells.concat(neighbor.cell.getAxisCells(axis, path, axisCells))
		})
		axisCells.sort((a, b) => {
			if (a.y < b.y) {
				return -1
			}
			if (a.y > b.y) {
				return 1
			}
			if (a.x < b.x) {
				return -1
			}
			if (a.x > b.x) {
				return 1
			}
			return 0
		})
		return axisCells
	}

	/**
	 * @readonly
	 * @type {number}
	 */
	get x() {
		return this._x
	}

	/**
	 * @readonly
	 * @type {number}
	 */
	get y() {
		return this._y
	}

	/**
	 * @type {number}
	 */
	get digit() {
		return this._digit
	}

	set digit(digit) {
		this._digit = digit
	}

	/**
	 * @readonly
	 * @type {type}
	 */
	get row() {
		return this._row
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
	 * @type {SubGrid}
	 */
	get subGrid() {
		return this._subGrid
	}

	/**
	 * @readonly
	 * @type {Neighbor[]}
	 */
	get neighbors() {
		return this._neighbors
	}

}

export default Cell
