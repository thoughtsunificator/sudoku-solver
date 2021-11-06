/**
 * @global
 */
class RelativePosition {

	/**
	 * @property AXIS {Axis}
	 * @property AXIS.VERTICAL       {string}
	 * @property AXIS.HORIZONTAL     {string}
	 * @property AXIS.DIAGONAL_LEFT  {string}
	 * @property AXIS.DIAGONAL_RIGHT {string}
	 */
	static AXIS = {
		VERTICAL: "VERTICAL",
		HORIZONTAL: "HORIZONTAL",
		DIAGONAL_LEFT: "DIAGONAL_LEFT",
		DIAGONAL_RIGHT: "DIAGONAL_RIGHT",
	}

	/**
	 * @property Direction {Direction}
	 * @property Direction.FORWARD  {string}
	 * @property Direction.BACKWARD {string}
	 */
	static DIRECTION = {
		FORWARD: "FORWARD",
		BACKWARD: "BACKWARD",
	}

	/**
	 * @param {Axis}       axis
	 * @param {Direction} direction
	 */
	constructor(axis, direction) {
		this._axis = axis
		this._direction = direction
	}

	/**
	 * @readonly
	 * @type {Axis}
	 */
	get axis() {
		return this._axis
	}

	/**
	 * @readonly
	 * @type {Direction}
	 */
	get direction() {
		return this._direction
	}

}

export default RelativePosition
