Full Stack Student Fee Management System
This is a full-stack web application designed to allow students to manage and update their fee payment status through a secure, login-based system.

Table of Contents
Features

Tech Stack

Prerequisites

Backend Setup

Folder Structure

Environment Variables

Installation

Running the Server

API Endpoints

Frontend Setup

Folder Structure

API Configuration

Installation

Running the Client

Usage

Important Notes & Security

Features
Navigation Bar: Includes "All Students" and "Profile" tabs, and dynamic "Login/Logout" buttons.

All Students Page: Displays a list/table of all registered students with their Name, Email, and Fees Paid Status (Yes/No). Updates reflect changes made from the Profile page.

Profile Page:

Requires login authentication.

Students can view and edit their Name and Email.

Displays current fee payment status.

If fees are not paid, a "Pay Fees" button is shown.

Clicking "Pay Fees" leads to a simulated payment page.

"Pay Now" simulates payment and updates the "Fees Paid" status to "Yes".

Login/Signup: Secure authentication using JWT (JSON Web Tokens).

Data Persistence: Student and user data is stored in a MongoDB database.

Tech Stack
Backend:

Node.js: JavaScript runtime.

Express.js: Web application framework.

MongoDB: NoSQL database.

Mongoose: MongoDB object data modeling (ODM) for Node.js.

bcryptjs: For password hashing.

jsonwebtoken (JWT): For secure authentication.

cors: For Cross-Origin Resource Sharing.

Frontend:

React.js: JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for styling.

Context API: For global state management (authentication).

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

npm (comes with Node.js) or Yarn

MongoDB:

Either a local MongoDB instance running (e.g., via Docker or installed directly).

Or a cloud-hosted MongoDB Atlas cluster (recommended for easier setup).

Backend Setup
Backend Folder Structure
backend/
![alt text](image.png)

Backend Environment Variables
Create a file named .env in the backend/ root directory and add the following:

MONGODB_URI=mongodb+srv://shivam9198:godisgreat123@studentdb.bvsfy6q.mongodb.net/ # Replace with your MongoDB connection string
JWT_SECRET=your_hardcoded_secret_key # IMPORTANT: This is hardcoded for demo, change for production!
PORT=3000 # Or any other port you prefer

Note: For this specific demo, JWT_SECRET is hardcoded directly in auth.js and middleware/auth.js. While this is generally bad practice for security, it was done to address a specific debugging request. In a real application, you would use process.env.JWT_SECRET in both those files and rely solely on the .env file.

Backend Installation
Navigate to the backend directory in your terminal:

cd backend

Install the required Node.js packages:

npm install

Running the Server
From the backend directory, start the server:

node app.js
# or (if you installed nodemon for development)
npm run dev

You should see MongoDB connected successfully and Server running on port 3000 (or your chosen port) in your terminal.

API Endpoints
The backend provides the following RESTful API endpoints:

POST /api/auth/register : Register a new user and create a student profile.

Body: { "name": "string", "email": "string", "password": "string" }

POST /api/auth/login : Authenticate a user and receive a JWT.

Body: { "email": "string", "password": "string" }

GET /api/students : Get a list of all student records. (Publicly accessible)

GET /api/profile : Get the logged-in user's student profile.

Headers: Authorization: Bearer <JWT_TOKEN>

PUT /api/profile : Update the logged-in user's name and email.

Headers: Authorization: Bearer <JWT_TOKEN>

Body: { "name": "string", "email": "string" }

POST /api/profile/pay-fees : Simulate fee payment for the logged-in user.

Headers: Authorization: Bearer <JWT_TOKEN>

Frontend Setup
Frontend Folder Structure
frontend/
![alt text](image-1.png)

Frontend API Configuration
Create a file named api.js inside frontend/src/config/ and add:

// frontend/src/config/api.js
export const API_BASE_URL = 'http://localhost:3000/api'; // MUST match your backend port

Frontend Installation
Navigate to the frontend directory in your terminal:

cd frontend

Install the required Node.js packages (React, Tailwind CSS, etc.):

npm install
# or
yarn install

(If you initiated your React project with create-react-app or Vite, most dependencies will already be present.)

Running the Client
From the frontend directory, start the React development server:

npm start
# or
yarn start

The application should open in your browser, typically at http://localhost:3000 (or another available port).

Usage
Start both the Backend and Frontend servers.

Navigate to the application in your browser.

Sign Up: Click on the "Login" button in the Navbar, then switch to "Sign Up". Provide your Name, Email, and Password to create a new account.

Login: After signing up, you will be automatically logged in. If not, use your newly created credentials to log in.

Profile Page: Once logged in, you'll be redirected to your "Profile" page.

View your details and current fee status.

Click "Edit Details" to change your name or email.

If fees are "No", click "Pay Fees" to simulate a payment.

All Students Page: Navigate to the "All Students" tab to see a list of all registered students and their fee payment status. Changes made on your profile (like paying fees) will reflect here in real-time (or on refresh for the current setup).

Important Notes & Security
Hardcoded JWT_SECRET: For this demonstration, the JWT_SECRET is hardcoded directly into the backend files (auth.js and middleware/auth.js). This is a severe security vulnerability and must NEVER be done in a production application. In a real-world scenario, this secret should always be loaded from environment variables (like in the .env file) and kept highly confidential.

Simulated Payment: The "Pay Fees" functionality is a simulation only. It does not integrate with any actual payment gateway.

Real-time Updates (Optional): The current frontend fetches data on component mount/state changes. For true real-time updates (e.g., "All Students" page updating instantly when another user pays fees), you would need to implement WebSockets (e.g., Socket.IO) on both the backend and frontend.