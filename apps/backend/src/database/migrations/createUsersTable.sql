CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    user_password TEXT NOT NULL,
    user_email VARCHAR(254) UNIQUE NOT NULL,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    user_points INT NOT NULL DEFAULT 0,
);