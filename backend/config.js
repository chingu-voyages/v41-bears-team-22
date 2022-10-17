"use strict";

/** Shared config for applications. Can be required in many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
	return process.env.NODE_ENV === "test"
		? "fasttrack_test"
		: process.env.DATABASE_URL || "fasttrack";
}

// Speed up bcrypt during tests, since the safety of the algorithm is not being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Fast Track Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("----");

module.exports = { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseUri };
