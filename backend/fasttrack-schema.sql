DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS applications CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    githublink TEXT NOT NULL,
    linkedinlink TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE TABLE companies (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     website TEXT NOT NULL,
--     phone_number TEXT,
--     address TEXT,
--     linkedinlink TEXT,
--     recruiter_phonenumber TEXT
-- );

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    company_name TEXT NOT NULL,
    jobpostlink TEXT NOT NULL,
    location TEXT,
    dateofapplication DATE,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    status TEXT
);
