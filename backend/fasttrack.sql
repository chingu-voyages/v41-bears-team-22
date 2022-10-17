\echo 'Delete and recreate fasttrack database?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fasttrack;
CREATE DATABASE fasttrack;
\connect fasttrack;

\i fasttrack-schema.sql;
\i fasttrack-seed.sql;

\echo 'Delete and recreate fasttrack_test database?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fasttrack_test;
CREATE DATABASE fasttrack_test;
\connect fasttrack_test

\i fasttrack-schema.sql