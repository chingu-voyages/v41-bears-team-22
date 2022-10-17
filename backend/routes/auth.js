"use strict";
/** Routes for authentication */

const jsonschema = require("jsonschema");
const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuthSchema.json");
const userRegisterSchema = require("../schemas/userRegisterSchema.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token: {email, password} => { token }
 *
 * Returns JWT token which can be sued to authenticate further requests
 *
 * Authorization required: none
 */

router.post("/token", async (req, res, next) => {
	try {
		const validator = jsonschema.validate(req.body, userAuthSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const { email, password } = req.body;
		const user = await User.authenticate(email, password);
		const token = createToken(user);
		return res.json({ token });
	} catch (error) {
		return next(error);
	}
});

/** POST /auth/register: { user } => { token }
 *
 * User must include first_name, last_name, email, password, githublink, linkedinlink
 *
 * Return JWT token which can be used to authenticate further requests
 *
 * Authorization required: none
 */
router.post("/register", async (req, res, next) => {
	try {
		const validator = jsonschema.validate(req.body, userRegisterSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const newUser = await User.register({ ...req.body, isAdmin: false });
		const token = createToken(newUser);
		return res.status(201).json({ token });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
