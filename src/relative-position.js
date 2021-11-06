class RelativePosition {

	static AXIS = {
		VERTICAL: "VERTICAL",
		HORIZONTAL: "HORIZONTAL",
		DIAGONAL_LEFT: "DIAGONAL_LEFT",
		DIAGONAL_RIGHT: "DIAGONAL_RIGHT",
	}

	static DIRECTION = {
		FORWARD: "FORWARD",
		BACKWARD: "BACKWARD",
	}

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
