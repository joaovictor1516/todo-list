CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    user_email VARCHAR() UNIQUE NOT NULL,
    user_name VARCHAR() UNIQUE NOT NULL,
    user_points NUMERIC(2) NOT NULL DEFAULT 0,
);