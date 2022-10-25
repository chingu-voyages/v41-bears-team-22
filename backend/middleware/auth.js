"use strict";

/** Middleware to handle common authorization cases in routes. */
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authorize user.
 *
 * If a token was provided, verify it, and if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field).
 *
 * It is not an error if no token was provides or if the token is not valid
 */

const authenticateJWT = (req, res, next) => {
	try {
		const authHeader = req.headers && req.headers.authorization;
		if (authHeader) {
			const token = authHeader.replace(/^[Bb]earer /, "").trim();
			res.locals.user = jwt.verify(token, SECRET_KEY);
		}
		return next();
	} catch (err) {
		return next();
	}
};

/** Middleware to use when user must be logged in.
 *
 * If not, raises an Unauthorized error.
 */
const ensureLoggedIn = (req, res, next) => {
	try {
		if (!res.locals.user) throw new UnauthorizedError();
		return next();
	} catch (error) {
		return next(error);
	}
};

/** Middleware to use when user must be an admin.
 *
 * If not, raises an Unauthorized error.
 */
const ensureAdmin = (req, res, next) => {
	try {
		if (!res.locals.user || !res.locals.user.isAdmin) {
			throw new UnauthorizedError();
		}
		return next();
	} catch (error) {
		return next(error);
	}
};

/** Middleware to use when user must provide a valid token
 * and matching email in the route parameter.
 *
 * If not, raises an Unauthorized error.
 */
const ensureCorrectUserOrAdmin = (req, res, next) => {
	try {
		const user = res.locals.user;
		if (!(user && (user.isAdmin || user.username === req.params.username))) {
			throw new UnauthorizedError();
		}
		return next();
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	authenticateJWT,
	ensureLoggedIn,
	ensureAdmin,
	ensureCorrectUserOrAdmin,
};
