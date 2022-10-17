"use strict";

/** Express app for Fast Track */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const applicationRoutes = require("./routes/applications");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/applications", applicationRoutes);

/** Handle 404 errors - this matches everything */
app.use((req, res, next) => {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here */
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV !== "test") {
		console.error(err.stack);
	}
	const status = err.status || 500;
	const message = err.message;
	return res.status(status).json({ error: { message, status } });
});

module.exports = app;
