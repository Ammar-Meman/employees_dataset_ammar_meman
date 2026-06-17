# Employee Management Analytics API

## Overview

Employee Management Analytics API is a backend application built using Node.js, Express.js, MongoDB, and Mongoose. The project provides a complete employee management system with support for CRUD operations, advanced filtering, searching, sorting, pagination, authentication, analytics, and statistics generation.

The API is designed using MVC architecture and follows industry-standard backend development practices.

---

## Features

### Employee Management

* Create employee records
* Fetch all employees
* Fetch employee by ID
* Update employee details
* Delete employee records
* Bulk employee operations

### Search & Filtering

* Search employees by keyword
* Filter employees by:

  * Country
  * State
  * City
  * Domain
  * Skills
  * Certifications
  * Experience
  * Timezone
  * Verification status

### Sorting

* Sort employees by:

  * Name
  * Experience
  * Country
  * State
  * City
  * Last Updated

### Pagination

* Configurable page and limit support
* Efficient large dataset handling

### Authentication & Authorization

* User registration
* User login
* Password hashing using bcrypt
* JWT-based authentication (access + refresh tokens)
* Protected routes
* Role-based access control

### Analytics

* Top skills analysis
* Domain distribution
* Certification analysis
* Project distribution
* Experience distribution
* Location distribution (country, state, city)

### Statistics

* Total employee count
* Average experience
* Verified employee count
* Total project count
* Total task count

### Middleware

* Authentication middleware
* Authorization middleware (role-based)
* Validation middleware
* Request logger middleware (with timing)
* Global error handler

---

## Technology Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcryptjs

### Utilities

* dotenv
* cors
* morgan
* express-validator

---

## Project Structure

```text
backend/
├── .env
├── .gitignore
├── package.json
│
└── src/
    ├── app.js
    ├── server.js
    │
    ├── config/
    │   └── db.js
    │
    ├── controllers/
    │   ├── analyticsController.js
    │   ├── authController.js
    │   ├── employeeController.js
    │   ├── searchController.js
    │   └── statsController.js
    │
    ├── middlewares/
    │   ├── authMiddleware.js
    │   ├── errorMiddleware.js
    │   ├── loggerMiddleware.js
    │   ├── roleMiddleware.js
    │   └── validationMiddleware.js
    │
    ├── models/
    │   ├── Employee.js
    │   └── User.js
    │
    ├── routes/
    │   ├── analyticsRoutes.js
    │   ├── authRoutes.js
    │   ├── employeeRoutes.js
    │   ├── searchRoutes.js
    │   └── statsRoutes.js
    │
    ├── services/
    │   ├── analyticsService.js
    │   ├── authService.js
    │   ├── employeeService.js
    │   └── statsService.js
    │
    ├── utils/
    │   ├── AppError.js
    │   ├── apiResponse.js
    │   ├── asyncHandler.js
    │   ├── filterBuilder.js
    │   └── pagination.js
    │
    └── validations/
        ├── authValidation.js
        └── employeeValidation.js
```

---

## Database Schema Overview

### Employee

```json
{
  "id": "E00001",
  "name": "Geoffrey Zimmerman",
  "profile": {
    "contact": {
      "email": "example@email.com",
      "phone": "+1-123456789",
      "address": {
        "street": "Street Name",
        "city": "City",
        "location": {
          "state": "State",
          "country": "Country",
          "geo": {
            "lat": "0.000",
            "long": "0.000",
            "timezone": {
              "name": "America/Denver",
              "utc_offset": "-07:00"
            }
          }
        }
      }
    },
    "projects": []
  }
}
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd employees_dataset_ammar_meman
```

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## API Endpoints

### Employee Routes

```http
GET    /api/v1/employees
GET    /api/v1/employees/:id
POST   /api/v1/employees
PUT    /api/v1/employees/:id
PATCH  /api/v1/employees/:id
DELETE /api/v1/employees/:id
GET    /api/v1/employees/exists/:id
POST   /api/v1/employees/bulk-create
PATCH  /api/v1/employees/bulk-update
DELETE /api/v1/employees/bulk-delete
```

### Search

```http
GET /api/v1/search/employees?q=java
```

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
GET  /api/v1/auth/profile
PATCH /api/v1/auth/profile
```

### Analytics

```http
GET /api/v1/analytics/employees/top-skills
GET /api/v1/analytics/employees/top-domains
GET /api/v1/analytics/employees/top-certifications
GET /api/v1/analytics/employees/location-distribution
GET /api/v1/analytics/employees/experience-distribution
GET /api/v1/analytics/employees/project-distribution
```

### Statistics

```http
GET /api/v1/stats/overview
```

---

## Query Features

### Filtering

```http
GET /api/v1/employees?country=USA
GET /api/v1/employees?state=RI
GET /api/v1/employees?domain=Cloud
GET /api/v1/employees?primarySkill=Java
GET /api/v1/employees?verified=true
GET /api/v1/employees?timezone=America/Denver
```

### Sorting

```http
GET /api/v1/employees?sort=name
GET /api/v1/employees?sort=experience&order=desc
```

### Pagination

```http
GET /api/v1/employees?page=1&limit=10
```

### Combined Query

```http
GET /api/v1/employees?country=USA&domain=Cloud&sort=experience&order=desc&page=1&limit=10
```

---

## Authentication Flow

### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Ammar Meman",
  "email": "ammar@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "ammar@example.com",
  "password": "password123"
}
```

Returns:

```json
{
  "success": true,
  "message": "Logged in successfully",
  "data": {
    "user": { ... },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### Protected Routes

Include JWT token:

```http
Authorization: Bearer <accessToken>
```

---

## Error Handling

Standard API response structure:

```json
{
  "success": false,
  "message": "Employee not found",
  "error": null
}
```

---

## Performance Optimizations

Implemented:

* MongoDB Indexing
* Pagination
* Query Filtering
* Aggregation Pipelines
* Optimized Search
* Projection Support

---

## Author

**Ammar Meman**

Full Stack Development Project – 2026

Node.js | Express.js | MongoDB | Mongoose | JWT Authentication