INSERT INTO users (first_name, last_name, email, password, githublink, linkedinlink, is_admin)
VALUES('Promise',
        'Morka',
        'onyekamorka06@gmail.com',
        '$2b$12$j3CL9gbvpAy6DJjlS.Diau9rdGWZYwO5LRmi7qM9t3LwWiQRI/UXq',
        'https://github.com/promisethedeveloper',
        'https://www.linkedin.com/in/promisemorka/',
        TRUE);

-- INSERT INTO companies (name, website, phone_number, address, linkedinlink, recruiter_phonenumber)
-- VALUES('ABC Tech',
--         'https://abctech.com',
--         '2401234567',
--         '2892 ABC Tech Drive',
--         'https://www.linkedin.com/jobs/',
--         '24012334566');

INSERT INTO applications (role, company_name, jobpostlink, location, dateofapplication, user_id, status)
VALUES ('Software Engineer',
        'ABC Tech',
        'https://abctech.com/techjobs',
        'Washington DC',
        '2022-10-01',
        1,
        'Applied');