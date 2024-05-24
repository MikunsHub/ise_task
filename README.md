# User Authentication and Management API
This is a RESTful API for user authentication and management built with NestJS, a powerful Node.js framework. It provides various features for user registration, login, account verification, password management, and user profile updates.

## Features
1. User Registration: Users can register with their email, firstname, lastname, and password.

2. JWT Authentication: JSON Web Token (JWT) based authentication is used to secure endpoints.

3. Password Hashing: User passwords are securely hashed using bcrypt before being stored in the database.

4. Account Verification: Users receive an OTP (One-Time Password) via email for account verification during registration.

5. Login: Registered users can log in with their email and password to obtain a JWT access token.

6. OTP Generation: Users can request to regenerate their OTP if needed.

7. Multi-Factor Authentication (MFA): MFA functionality to prevent against malicious account snatching.

<!-- 7. Password Reset: Password reset functionality is not implemented yet. -->

8. Update User Profile: Users can update their firstname and lastname.

## Environment Variables
- PORT: Port number for the server (default is 3000).
POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_NAME: Database connection details.
JWT_SECRET: Secret key for JWT token generation.

## Installation
1. Clone the repository:
```bash
git clone https://github.com/MikunsHub/ise_task.git
```
2. Install dependencies:
```bash
cd ise_task
npm install
```
3. Configure environment variables:
Create a .env file in the root of the project and add the necessary environment variables such as database connection details, JWT secret, etc.
4. Initialize database
```bash
make docker-run
```
5. Start the application:
```bash
npm run start:dev
```
## Usage
Once the application is running, you can make HTTP requests to the provided endpoints using a tool like Postman or cURL.

## Endpoints
#### Auth Endpoints
- POST /auth/register: Register a new user.
- POST /auth/login: Login a user and obtain a JWT token.
- POST /auth/verify-otp: Verify user's OTP for account verification.
- POST /auth/generate-otp: Generate a new OTP for account verification.
#### User Endpoints
- PATCH /users/update: Update user's firstname and lastname.

### How Authentication Works
#### Registration
1. **Endpoint**: POST /auth/register
2. **Description**: A new user registers by providing their email, firstname, lastname, and password.
3. **Process**:
  - The password is hashed using bcrypt.
  - An OTP is generated and sent to the user's email for verification.
  - The user details along with the hashed password and OTP are saved in the database.

#### Account Verification
1. **Endpoint**: POST /auth/verify-otp
2. **Description**: User verifies their account by submitting the OTP sent to their email.
3. **Process**:
- The submitted OTP is checked against the one stored in the database.
- If valid, the user's account is marked as verified.

#### Login
1. **Endpoint**: POST /auth/login
2. **Description**: Registered users can log in by providing their email and password.
3. **Process**:
- The email and password are validated.
- If valid, an OTP is generated and sent to the user's email.
- The user must verify the OTP to complete the login process.

#### OTP Generation
1. **Endpoint**: POST /auth/generate-otp
2. **Description**: Users can request a new OTP if they need to verify their account.
3. **Process**:
- A new OTP is generated and sent to the user's email.
- The new OTP and its expiration time are saved in the database.
#### Updating User Profile
1. **Endpoint**: PATCH /users/update
2. **Description**: Users can update their firstname and lastname.
3. **Process**:
- The user's ID is extracted from the JWT token.
- The provided firstname and lastname are updated in the database.

### API Documentation
Detailed API documentation is available [here](https://documenter.getpostman.com/view/22086870/2sA3QqfCBM).

## Roadmap

- [x] Implement Multi-Factor Authentication (MFA).
- [ ] Implement password reset functionality.
