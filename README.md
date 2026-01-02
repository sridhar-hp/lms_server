# Leave Management System (LMS) – Backend

This repository contains the **backend REST API** for the Leave Management System, built using **Node.js, Express.js, and MongoDB**.  
It handles authentication, leave processing, user management, and business logic.

## Features
- JWT-based authentication
- Role-based access control (Student / Staff / Admin)
- Leave application and approval workflow
- Leave balance validation and updates
- Secure REST APIs

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure
```
LMS
└── lms_server
    ├── config
    ├── controllers
    │   ├── actionController.js
    │   ├── applyController.js
    │   ├── authController.js
    │   ├── leaveController.js
    │   ├── requestController.js
    │   ├── settingsController.js
    │   └── statusController.js
    ├── middleware
    │   └── auth.js
    ├── models
    │   ├── User.js
    │   └── Leave.js
    ├── routes
    │   ├── adminRoutes.js
    │   ├── authRoutes.js
    │   └── userRoutes.js
    ├── Server.js
    ├── .env
    └── package.json

```
## Setup Instructions
1. Clone the repository  
2. Navigate to `lms_server`  

3. Install dependencies:
```
npm install
```

4. Create a `.env` file:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

5. Start the server:
```
node server.js
```


## API Testing
- APIs can be tested using **Postman**
- Supports GET, POST, PUT, and DELETE methods
- JWT token required for protected routes

## Author
**Sridhar K**  
Backend / Full Stack Developer
