/** ExpressError class extends the normal JS error so we can
 * add a status when we make an instance of it.
 *
 * The error handling middleware will return this.
 */

class ExpressError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

/** 404 not found error. */
class NotFoundError extends ExpressError {
	constructor(message = "Not found") {
		super(message, 404);
	}
}

/** 401 Unauthorized error. */
class UnauthorizedError extends ExpressError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

/** 400 Bad request error. */
class BadRequestError extends ExpressError {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}

/** 403 Forbidden request error. */
class ForbiddenError extends ExpressError {
	constructor(message = "Bad request") {
		super(message, 403);
	}
}

module.exports = {
	ExpressError,
	NotFoundError,
	UnauthorizedError,
	BadRequestError,
	ForbiddenError,
};
