import Row from "./row.js"
import Sudoku from "./sudoku.js"

class SubGrid {

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		this._x = x
		this._y = y
		this._rows = {}
	}

	/**
	 * @param {Cell} cell
	 */
	addCell(cell) {
		if(!this._rows[cell.x]) {
			this._rows[cell.x] = new Row(cell.x)
		}
		this._rows[cell.x].cells[cell.y] = cell
		this._rows[cell.x].cells[cell.y]._row = this._rows[cell.x].cells[cell.y]
		cell._subGrid = this
	}

	/**
	 * @returns {Array<Number>}
	 */
	getAvailableDigits() {
		const digits = this.getUsedDigits()
		return Sudoku.DIGITS.filter(digit => !digits.includes(digit))
	}

	/**
	 * @returns {boolean}
	 */
	hasMatchingDigits() {
		const digits = this.getUsedDigits()
		for(const [index, digit] of digits.entries()) {
			if(digits.indexOf(digit, index + 1) !== -1) {
				return true
			}
		}
		return false
	}

	/**
	 * @returns {Array<Number>}
	 */
	getUsedDigits() {
		return this.getCells().map(cell => cell.digit).filter(Boolean)
	}

	/**
	 * @param   {number} x
	 * @param   {number} y
	 * @returns {Cell}
	 */
	getCell(x, y) {
		return this.rows[x].cells[y]
	}

	/**
	 * @returns {Cell[]}
	 */
	getCells() {
		return Object.values(this.rows).map(row => Object.values(row.cells)).flat()
	}

	/**
	 * @returns {Cell[]}
	 */
	getAvailableCells() {
		return this.getCells().filter(cell => cell.digit === null)
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
	 * @readonly
	 * @type {object}
	 */
	get rows() {
		return this._rows
	}

}

export default SubGrid
