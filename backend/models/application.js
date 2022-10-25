"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for applications */

class Application {
	/** Create an application from data, update database, return new application
	 *
	 * data should contain { role, jobpostlink, users_id, company_id, status }
	 */

	static async create({
		username,
		role,
		companyName,
		jobpostlink,
		location,
		dateofapplication,
		status,
	}) {
		const result = await db.query(
			`INSERT INTO applications
             (username, role, company_name, jobpostlink, location, dateofapplication, status)
             VALUES($1, $2, $3, $4, $5, $6, $7)
             RETURNING role, company_name, jobpostlink, location, dateofapplication, status`,
			[
				username,
				role,
				companyName,
				jobpostlink,
				location,
				dateofapplication,
				status,
			]
		);
		const application = result.rows[0];
		return application;
	}

	/** Given a user id, return all user's applications
	 *
	 * Returns { role, companyName, jobpostlink, location, dateofappication, status }
	 */

	static async getAll(username) {
		const applicationsRes = await db.query(
			`SELECT role,
                    company_name AS "companyName",
                    jobpostlink,
                    location,
                    dateofapplication,
					status
                    FROM applications
                    WHERE username = $1`,
			[username]
		);

		const applications = applicationsRes.rows;
		return applications;
	}

	/** Given a job link, return data about the role
	 *
	 * Returns { role, companyName, jobpostlink, location, dateofappication }
	 */

	static async get(jobpostlink) {
		const applicationRes = await db.query(
			`SELECT role,
                    company_name AS "companyName",
                    jobpostlink,
                    location,
                    dateofapplication,
					status
                    FROM applications
                    WHERE jobpostlink = $1`,
			[jobpostlink]
		);

		if (!applicationRes) {
			throw new NotFoundError(`No job: ${jobpostlink}`);
		}

		const application = applicationRes.rows[0];
		return application;
	}

	/** Update role data with `data`
	 *
	 * This is a partial update - it's fine if it does not contain
	 * all the fields; this only changes provided ones.
	 *
	 * Data can include { role, companyName, jobpostlink, location, dataofapplication }
	 *
	 * Returns { role, companyName, jobpostlink, location, dateofappication }
	 *
	 * Throws NotFoundError if not found
	 */

	static async update(username, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			companyName: "company_name",
		});
		const usernameVarIdx = "$" + (values.length + 1);
		const querySql = `UPDATE applications 
							SET ${setCols}
							WHERE username = ${usernameVarIdx}
							RETURNING username,
									  role,
									  company_name AS "companyName",
									  jobpostlink,
									  location,
									  dateofapplication,
									  status`;
		const result = await db.query(querySql, [...values, username]);
		const application = result.rows[0];

		if (!application) throw new NotFoundError(`No user: ${username}`);

		return application;
	}

	/** Delete given application from database; returns undefined
	 *
	 * Throws NotFoundError if application not found
	 */

	static async remove(jobpostlink) {
		let result = await db.query(
			`DELETE
			FROM applications
			WHERE jobpostlink=$1
			RETURNING jobpostlink`,
			[jobpostlink]
		);
		const application = result.rows[0];
		if (!application) throw new NotFoundError(`No application: ${jobpostlink}`);
	}
}

module.exports = Application;
