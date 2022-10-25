"use strict";

/** Routes for applications */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Application = require("../models/application");

const applicationNewSchema = require("../schemas/applicationNew");
const applicationUpdateSchema = require("../schemas/applicationUpdate");

const router = new express.Router();

/** POST /
 *
 * { applications: [ {username, role, company_name, jobpostlink, location, dateofapplication, status }] }
 *
 * Returns { username, role, company_name, jobpostlink, location, dateofapplication, status }
 *
 * Authorization required: Admin or correct user
 */

router.post("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const validator = jsonschema.validate(req.body, applicationNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const application = await Application.create(req.body);
		return res.status(201).json({ application });
	} catch (error) {
		return next(error);
	}
});

/** GET /username
 *
 * { applications: [ {role, company_name, jobpostlink, location, dateofapplication, status } ] }
 *
 * Authorization required: Admin or correct user
 *
 */

router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const { username } = req.params;
		const applications = await Application.getAll(username);
		return res.json({ applications });
	} catch (error) {
		return next(error);
	}
});
/** GET /
 *
 * { applications: [ {role, company_name, jobpostlink, location, dateofapplication, status } ] }
 */

router.get("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const { joblink } = req.query;
		const application = await Application.get(joblink);
		return res.json({ application });
	} catch (error) {
		return next(error);
	}
});

/** PATCH /[username] { field1, field2, ... } => { application }
 *
 * Patches application data.
 *
 * fields can be { role, companyName, jobpostlink, location, dataofapplication, status }
 *
 * Returns { username, role, companyName, jobpostlink, location, dataofapplication, status }
 *
 * Authorization required: Admin or correct user
 */

router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const validator = jsonschema.validate(req.body, applicationUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const application = await Application.update(req.params.username, req.body);
		return res.json({ application });
	} catch (error) {
		return next(error);
	}
});

/** DELETE /[jobpostlink] => { deleted: jobpostlink }
 *
 * Authorization required: admin or same-user-as:username
 */

router.delete(
	"/:username",
	ensureCorrectUserOrAdmin,
	async (req, res, next) => {
		try {
			await Application.remove(req.query.jobpostlink);
			return res.json({ deleted: req.query.jobpostlink });
		} catch (error) {
			return next(error);
		}
	}
);

module.exports = router;
