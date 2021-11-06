import Neighbor from "./neighbor.js"
import Cell from "./cell.js"
import Row from "./row.js"
import SubGrid from "./sub-grid.js"

/**
 * @global
 */
class Grid {

	constructor() {
		this._rows = {}
		this._subGrids = []
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} digit
	 */
	addCell(x, y, digit) {
		const cell = new Cell(x, y, digit)
		cell._grid = this
		for(const cell_ of this.getCells()) {
			const relativePosition = cell.getRelativePosition(cell_)
			if (relativePosition) {
				const neighbor = new Neighbor(cell_, relativePosition)
				cell.neighbors.push(neighbor)
				const relativePosition_ = cell_.getRelativePosition(cell)
				const neighbor_ = new Neighbor(cell, relativePosition_)
				cell_.neighbors.push(neighbor_)
			}
		}
		if(!this._rows[x]) {
			this._rows[x] = new Row(x)
		}
		this._rows[x].cells[y] = cell
		this._rows[x].cells[y]._row = this._rows[x].cells[y]
		return cell
	}

	buildSubGrids() {
		for(const cell of this.getCells()) {
			const neighborsSubGrid = cell.neighbors.find(neighbor => neighbor.cell.subGrid)
			if(cell.neighbors.length === 8 && !neighborsSubGrid) {
				const subGrid = new SubGrid(cell.x, cell.y)
				this.subGrids.push(subGrid)
				subGrid.addCell(cell)
				cell.neighbors.forEach(neighbor => {
					subGrid.addCell(neighbor.cell)
				})
			}
		}
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
		return this.getCells().filter(cell => !cell.digit)
	}

	toArray() {
		return [...Object.values(this.rows).map(row => Object.values(row.cells).map(cell => cell.digit))]
	}

	/**
	 * @readonly
	 * @type {object}
	 */
	get rows() {
		return this._rows
	}

	/**
	 * @readonly
	 * @type {SubGrid[]}
	 */
	get subGrids() {
		return this._subGrids
	}

}

export default Grid
