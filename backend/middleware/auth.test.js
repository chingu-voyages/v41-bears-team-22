"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
	authenticateJWT,
	ensureLoggedIn,
	ensureAdmin,
	ensureCorrectUserOrAdmin,
} = require("./auth");

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign(
	{ email: "test@gmail.com", isAdmin: false },
	SECRET_KEY
);
const badJwt = jwt.sign({ email: "test@gmail.com", isAdmin: false }, "wrong");

describe("authenticateJWT", () => {
	test("Works: via header", () => {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${testJwt}` } };
		const res = { locals: {} };
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({
			user: {
				iat: expect.any(Number),
				email: "test@gmail.com",
				isAdmin: false,
			},
		});
	});

	test("Works: No header", () => {
		expect.assertions(2);
		const req = {};
		const res = { locals: {} };
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});

	test("Works: Invalid token", () => {
		expect.assertions(2);
		const req = { headers: { authorization: `Bearer ${badJwt}` } };
		const res = { locals: {} };
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		authenticateJWT(req, res, next);
		expect(res.locals).toEqual({});
	});
});

describe("ensureLoggedIn", () => {
	test("Works", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: { user: { username: "test@gmail.com", is_admin: false } },
		};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		ensureLoggedIn(req, res, next);
	});

	test("unauth if no login", () => {
		expect.assertions(1);
		const req = {};
		const res = { locals: {} };
		const next = (err) => {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureLoggedIn(req, res, next);
	});
});

describe("ensureAdmin", () => {
	test("works", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: { user: { email: "test@gmail.com", isAdmin: true } },
		};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		ensureAdmin(req, res, next);
	});

	test("unauth if not admin", () => {
		expect.assertions(1);
		const req = {};
		const res = {
			locals: { user: { email: "test@gmail.com", isAdmin: false } },
		};
		const next = (err) => {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureAdmin(req, res, next);
	});

	test("unauth if anon", () => {
		expect.assertions(1);
		const req = {};
		const res = { locals: {} };
		const next = (err) => {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureAdmin(req, res, next);
	});
});

describe("ensureCorrectUserOrAdmin", () => {
	test("works: admin", () => {
		expect.assertions(1);
		const req = { params: { email: "test@gmail.com" } };
		const res = {
			locals: { user: { email: "test@gmail.com", isAdmin: true } },
		};
		const next = function (err) {
			expect(err).toBeFalsy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});

	test("works: same user", () => {
		expect.assertions(1);
		const req = { params: { email: "test@gmail.com" } };
		const res = {
			locals: { user: { email: "test@gmail.com", isAdmin: false } },
		};
		const next = (err) => {
			expect(err).toBeFalsy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});

	test("unauth: mismatch", () => {
		expect.assertions(1);
		const req = { params: { email: "wrong" } };
		const res = {
			locals: {
				user: {
					email: "test@gmail.com",
					isAdmin: false,
				},
			},
		};
		const next = (err) => {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});

	test("unauth: if anon", () => {
		expect.assertions(1);
		const req = { params: { username: "test" } };
		const res = { locals: {} };
		const next = (err) => {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		};
		ensureCorrectUserOrAdmin(req, res, next);
	});
});
