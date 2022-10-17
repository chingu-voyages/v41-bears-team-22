"use strict";

/** Routes for applications */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Application = require("../models/application");

const applicationNewSchema = require("../schemas/applicationNewSchema");
const applicationUpdateSchema = require("../schemas/applicationUpdateSchema");

const router = new express.Router();

/** POST /
 *
 * { applications: [ {role, company_name, jobpostlink, location, dateofapplication, status }] }
 *
 * Returns { role, company_name, jobpostlink, location, dateofapplication, status }
 *
 * Authorization required: Admin or correct user
 */

router.post("/", async (req, res, next) => {
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

/** GET /id
 *
 * { applications: [ {role, company_name, jobpostlink, location, dateofapplication, status } ] }
 */

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const applications = await Application.getAll(id);
		console.log(id);
		return res.json({ applications });
	} catch (error) {
		return next(error);
	}
});
/** GET /
 *
 * { applications: [ {role, company_name, jobpostlink, location, dateofapplication, status } ] }
 */

router.get("/", async (req, res, next) => {
	try {
		const { joblink } = req.query;
		const application = await Application.get(joblink);
		return res.json({ application });
	} catch (error) {
		return next(error);
	}
});

router.patch("/:joblink", async (req, res, next) => {
	try {
		const validator = jsonschema.validate(req.body, applicationUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const application = await Application.update(req.params.joblink, req.body);
		return res.json({ application });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
