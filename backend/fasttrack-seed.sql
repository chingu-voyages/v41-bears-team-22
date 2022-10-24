INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES(
        'testUer',
        '$2b$12$hBTHK/V8T1v6W2k3f5ku6OyX8/6vFfv1t/qkvCyVBGxhGMbRH74W2',
        'tester_firstName',
        'tester_LastName',
        'tester@gmail.com',
        TRUE);

-- INSERT INTO companies (name, website, phone_number, address, linkedinlink, recruiter_phonenumber)
-- VALUES('ABC Tech',
--         'https://abctech.com',
--         '2401234567',
--         '2892 ABC Tech Drive',
--         'https://www.linkedin.com/jobs/',
--         '24012334566');

INSERT INTO applications (username, role, company_name, jobpostlink, location, dateofapplication, status)
VALUES ('testUer',
        'Software Engineer',
        'ABC Tech',
        'https://abctech.com/techjobs',
        'Washington DC',
        '2022-10-01',
        'Applied'),('Promisethedev',
        'Full Stack Software Engineer',
        'DEF Tech',
        'https://deftech.com/techjobs',
        'New York NY',
        '2022-10-01',
        'Applied');