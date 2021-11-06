/**
 * @global
 */
class Row {

	/**
	 * @param {number} x
	 */
	constructor(x) {
		this._x = x
		this._cells = {}
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
	 * @type {object}
	 */
	get cells() {
		return this._cells
	}

}

export default Row
