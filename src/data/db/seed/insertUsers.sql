INSERT OR IGNORE INTO users (
    id,
    name,
    email,
    password,
    email_verified,
    verification_token,
    is_admin
)
VALUES (?, ?, ?, ?, ?, ?, ?);
