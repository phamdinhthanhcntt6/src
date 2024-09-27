export default class ErrorWithCode extends Error {
	private _code?: number;

	constructor({ message, code }: {message: string, code?: number}) {
		super(message);
		this._code = code;
	}

	set code(c) {
		this._code = c;
	}

	get code() {
		return this._code;
	}
}
