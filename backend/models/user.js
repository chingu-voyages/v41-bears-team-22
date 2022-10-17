"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
// const { sqlForPartialUpdate } = require("../helpers/sql");
const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
	/** Authenticate user with email, password.
	 *
	 * Returns { first_name, last_name, email, is_admin }
	 *
	 * Throws UnauthorizedError is user not found or wrong password.
	 **/
	static async authenticate(email, password) {
		// try to find user first
		const result = await db.query(
			`SELECT first_name AS "firstName", 
                    last_name AS "lastName", 
                    email, 
                    password,
                    githublink,
                    linkedinlink,
                    is_admin AS "isAdmin"
            FROM users
                WHERE email = $1`,
			[email]
		);

		const user = result.rows[0];

		if (user) {
			// Compare hashed password to a new harsh from password
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid) {
				delete user.password;
				return user;
			}
		}
		throw new UnauthorizedError("Invalid email/password");
	}

	/** Register user with data.
	 *
	 * Returns { firstName, lastName, email, isAdmin }
	 *
	 * Throws BadRequestError on duplicates
	 */

	static async register({
		firstName,
		lastName,
		email,
		password,
		githublink,
		linkedinlink,
		isAdmin,
	}) {
		const duplicateCheck = await db.query(
			`SELECT email 
                FROM users 
                WHERE email = $1`,
			[email]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate email: ${email}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
		const result = await db.query(
			`INSERT INTO users (first_name, last_name, email, password, githublink, linkedinlink, is_admin)
                VALUES($1, $2, $3, $4, $5, $6, $7)
                RETURNING first_name AS "firstName", last_name AS "lastName", email, is_Admin AS "isAdmin"`,
			[
				firstName,
				lastName,
				email,
				hashedPassword,
				githublink,
				linkedinlink,
				isAdmin,
			]
		);

		const user = result.rows[0];

		return user;
	}

	/** Find all users
	 *
	 * Returns [ {first_name, last_name, email, is_admin}, ...]
	 *
	 */

	static async findAll() {
		let result = await db.query(
			`SELECT email,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email,
                    is_Admin AS "isAdmin"
            FROM users
            ORDER BY email`
		);

		return result.rows;
	}

	/** Given an email, return data about user
	 *
	 * Returns { first_name, last_name, email, is_admin, companies, applications }
	 *          where applications is {
	 *                                  jobpostlink,
	 *                                  recruiter_phonenumber,
	 *                                  dateofapplication,
	 *                                  company_name
	 *                                }
	 */

	static async get(email) {
		const userRes = await db.query(
			`SELECT first_name AS "firstName",
                last_name AS "lastName,
                email,
                is_admin AS "isAdmin",
                FROM users
                WHERE email = $1`,
			[email]
		);

		const user = userRes.rows;
		return user;
	}
}

module.exports = User;
