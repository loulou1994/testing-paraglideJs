export class ApiError extends Error {
    details: string;

	constructor(message: string, details: string) {
		super(message);
		this.details = details;
	}
}
