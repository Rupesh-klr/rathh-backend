# Rathh Backend

Node.js backend server for Rathh, modeled after Taleeo-Learning-Backend but using the `rathh` MongoDB database.

## Features
 - Express.js server
 - MongoDB (Mongoose)
 - JWT authentication (ready for implementation)
 - Environment-based configuration

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```
2. Create a `.env` file (already provided) and set your MongoDB connection string.
3. Start the server:
	```bash
	npm run dev
	```
	or
	```bash
	npm start
	```

## Folder Structure
 - `src/config/` - Configuration files
 - `src/middleware/` - Express middleware (JWT, RBAC, etc.)
 - `src/rathh/controllers/` - Route controllers
 - `src/rathh/models/` - Mongoose models
 - `src/rathh/routes/` - Express routes
 - `src/rathh/services/` - Business logic/services

## License
MIT
# rathh-backend
