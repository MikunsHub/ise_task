# User Authentication and Management API
This is a RESTful API for user authentication and management built with NestJS, a powerful Node.js framework. It provides various features for user registration, login, account verification, password management, and user profile updates.

## Features
1. User Registration: Users can register with their email, firstname, lastname, and password.

2. JWT Authentication: JSON Web Token (JWT) based authentication is used to secure endpoints.

3. Password Hashing: User passwords are securely hashed using bcrypt before being stored in the database.

4. Account Verification: Users receive an OTP (One-Time Password) via email for account verification during registration.

5. Login: Registered users can log in with their email and password to obtain a JWT access token.

6. OTP Generation: Users can request to regenerate their OTP if needed.

7. Password Reset: Password reset functionality is not implemented yet.

<!-- Multi-Factor Authentication (MFA): MFA functionality is not implemented yet. -->

8. Update User Profile: Users can update their firstname and lastname.

## Endpoints
#### Auth Endpoints
- POST /auth/register: Register a new user.
- POST /auth/login: Login a user and obtain a JWT token.
- POST /auth/verify-otp: Verify user's OTP for account verification.
- POST /auth/generate-otp: Generate a new OTP for account verification.
#### User Endpoints
- PATCH /users/update: Update user's firstname and lastname.

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Install dependencies:
```bash
cd <project-folder>
npm install
```
3. Configure environment variables:
Create a .env file in the root of the project and add the necessary environment variables such as database connection details, JWT secret, etc.

4. Start the application:
```bash
npm start
```
## Usage
Once the application is running, you can make HTTP requests to the provided endpoints using a tool like Postman or cURL.

## Environment Variables
- PORT: Port number for the server (default is 3000).
POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_NAME: Database connection details.
JWT_SECRET: Secret key for JWT token generation.

## Roadmap

- [ ] Implement password reset functionality.
- [ ] Implement Multi-Factor Authentication (MFA).
- [ ] Enhance error handling and validation.
