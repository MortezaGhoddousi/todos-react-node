# Todo List Application

This is a Todo List application built with React on the front end and Node.js with Express on the back end. The application allows users to register, log in, and manage their personal tasks effectively. 

## Features

- **User Registration**: New users can create an account.
- **User Authentication**: Secure login/logout using JSON Web Tokens (JWT) and cookies.
- **Task Management**: Authenticated users can add, view, update, and delete their tasks.
- **REST API**: The server-side is built using Express and handles RESTful routes for task management.
- **Client-Side Interaction**: Axios is used for making HTTP requests to interact with the back-end services.
- **SQLite Database**: The application uses SQLite for persistent data storage.

## Technologies Used

- **Front End**:
  - React
  - Axios

- **Back End**:
  - Node.js
  - Express
  - SQLite

- **Authentication**:
  - JSON Web Tokens (JWT)
  - Cookies

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v12 or later)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MortezaGhoddousi/todos-react-node.git
   ```
2. **Server Setup:**:
   ```bash
   cd server
   npm install
   npm start
   ```
3. **Client Setup::**:
   ```bash
   cd client
   npm install
   npm start
   ```
Your application should now be running, and accessible at http://localhost:3000.

## API Endpoints
Here are the API endpoints available in the application:

POST /api/register: Register a new user

POST /api/login: Authenticate a user and return a JWT

GET /api/note: Retrieve all tasks

GET /api/note/:user: Retrieve all tasks belong to the authenticated user

POST /api/note: Create a new task

PUT /api/note/: Update and Delete a task by ID

### Usage
Register a new user through the registration page.

Login to the application using the registered credentials.

Navigate to your profile page to view and manage your tasks.

Use the various options to add, edit, or delete tasks.


### Acknowledgements
Express

React

SQLite

JWT

Axios
