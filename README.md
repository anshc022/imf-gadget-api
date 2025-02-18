# IMF Gadget Management API 🕵️‍♂️

[![Built for](https://img.shields.io/badge/Built%20for-Upraised%20Assignment-blue.svg)]()
[![Role](https://img.shields.io/badge/Role-Backend%20Intern-orange.svg)]()
[![Status](https://img.shields.io/badge/Status-Completed-success.svg)]()

> This project was developed as part of the Upraised Backend Engineering Internship application process.

## 🎯 Assignment Overview

Built a sophisticated REST API for managing Mission: Impossible Force's gadget inventory system. This project demonstrates my backend development capabilities through:

- RESTful API design
- Database modeling
- Authentication & Authorization
- Clean code practices
- API Documentation
- Error handling
- Testing implementation

## 🔍 Technical Implementation

## 🔄 System Flow

```mermaid
graph LR
    Client[Client Applications]
    Auth[Authentication]
    API[API Layer]
    DB[(Database)]
    Log[Logging System]
    
    Client --> Auth
    Auth --> API
    API --> DB
    API --> Log
    
    subgraph Operations
    API --- Gadgets[Gadget Operations]
    API --- Users[User Management]
    API --- Maintenance[Maintenance Tasks]
    end
```

## 🛠️ Tech Stack Used

- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT, bcrypt
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Deployment**: Docker, Railway

## 📝 Assignment Requirements Met

✅ RESTful API Implementation
✅ Database Integration
✅ Authentication System
✅ Documentation
✅ Testing
✅ Clean Code Practices
✅ Error Handling
✅ Deployment

## 🚀 Features

### Gadget Management

- Create and track mission gadgets with unique codenames
- Monitor power levels and reliability ratings
- Automated maintenance scheduling
- Real-time mission success probability calculations
- Detailed technical specifications tracking
- Self-destruct sequence capabilities
- Categorized equipment inventory

### Security & Access Control

- JWT-based authentication
- Role-based access control:
  - 🔑 **Admin**: Full system access
  - 🔧 **Technician**: Maintenance and updates
  - 👤 **Agent**: View and self-destruct operations
- Secure password hashing
- Protected routes and endpoints

### Technical Features

- RESTful API architecture
- PostgreSQL database with Sequelize ORM
- Interactive Swagger/OpenAPI documentation
- Environment-based configuration
- Comprehensive error handling
- Detailed activity logging

## 🨠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT, bcrypt
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Deployment**: Docker support

## 👋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Setup Instructions

Follow these steps to get the IMF Gadget Management API up and running:

### 1. Clone the Repository

```sh
 git clone <repo_url>
 cd imf-gadget-api
```

### 2. Configure Environment

Rename `.env.example` to `.env` and configure required variables:

```sh
 NODE_ENV=development
 PORT=5000
 DATABASE_URL=postgres://user:password@localhost:5432/imf_db
 JWT_SECRET=your_secret_key
```

### 3. Database Setup

```sh
 npx sequelize-cli db:migrate
```

### 4. Create Admin User

```sh
 npm run create-admin
```

### 5. Start Server

```sh
 npm start
```

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:5000`
- **Swagger UI**: `https://imf-gadget-api-ue70.onrender.com/api-docs/`
- **Production**: [**https://imf-gadget-api.com**](https://imf-gadget-api.com)
- **ALSO Development**: `http://localhost:5000/api-docs`

### Authentication

- JWT authentication required for most endpoints.

## 🗒️ Main Endpoints

### Gadgets

- `GET /gadgets` - List all gadgets
- `GET /gadgets?status=Available` - Filter by status
- `POST /gadgets` - Create new gadget
- `PATCH /gadgets/:id` - Update gadget
- `DELETE /gadgets/:id` - Decommission gadget
- `POST /gadgets/:id/self-destruct` - Trigger self-destruct
- `POST /gadgets/:id/maintenance` - Perform maintenance

### Users

- `POST /users/register` - Register new user
- `POST /auth/login` - User login
- `GET /users/me` - Get current user
- `PATCH /users/me` - Update profile
- `POST /users/me/change-password` - Change password

## 🥮 Sample Gadget Creation

```json
{
  "name": "The Shadow Net Hub",
  "status": "Available",
  "reliability": 0.88,
  "missionCount": 0,
  "category": "Communication",
  "powerLevel": 85,
  "description": "Portable satellite uplink with global coverage",
  "technicalSpecs": {
    "powerSource": "Solar Battery",
    "activeTime": "24 hours",
    "weight": "3kg",
    "dimensions": "50x50x20cm"
  }
}
```

## 📝 Examples

### Response Examples

Success Response:
```json
{
  "status": "success",
  "data": {
    "id": "g123",
    "name": "The Shadow Net Hub",
    "status": "Available"
  }
}
```

Error Response:
```json
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "Invalid authentication token"
}
```

### Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## ⚡ Rate Limiting

API requests are limited to:
- Authenticated users: 100 requests per minute
- Anonymous users: 20 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

## 🧖🏽‍♂️ Testing

Run unit tests:

```sh
 npm test
```

Run integration tests:

```sh
 npm run test:integration
```

Run security tests:

```sh
 npm run test:security
```

## 🛠️ Maintenance

- **Database**: Ensure backups are scheduled.
- **Logs**:
  - Application logs: `logs/app.log`
  - Error logs: `logs/error.log`
  - Access logs: `logs/access.log`

## 🚀 Deployment

### Docker Support

Build and run the project using Docker:

```sh
 docker-compose up --build
```

### Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection URL
- `JWT_SECRET` - JWT signing key
- `LOG_LEVEL` - Logging level

## 🔧 Troubleshooting

Common Issues:
1. **Connection Refused**
   ```
   Check if PostgreSQL is running:
   $ sudo service postgresql status
   ```

2. **Authentication Failed**
   - Verify JWT_SECRET in .env
   - Check token expiration
   - Ensure proper token format: "Bearer <token>"

3. **Database Sync Issues**
   ```sh
   # Reset database
   npm run db:reset
   
   # Run migrations
   npm run db:migrate
   ```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch:
   ```sh
   git checkout -b feature/amazing-feature
   ```
3. Commit changes:
   ```sh
   git commit -m 'Add amazing feature'
   ```
4. Push to branch:
   ```sh
   git push origin feature/amazing-feature
   ```
5. Open a pull request!

## 👤 Contact Information

- **Name**: [Your Name]
- **Email**: [Your Email]
- **Phone**: [Your Phone]
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]

---

💼 This project was completed as part of the Upraised Backend Engineering Internship application process.

## 🧑‍💻 Job Posting

# IMF Backend Engineer Position 🕵️‍♂️

[![Status](https://img.shields.io/badge/Status-Active-success.svg)]()
[![Location](https://img.shields.io/badge/Location-Bengaluru-blue.svg)]()
[![Type](https://img.shields.io/badge/Type-Internship-yellow.svg)]()

## 🎯 Mission Overview

At IMF Tech Division, we're developing sophisticated gadget management systems that seamlessly integrate with existing field operations to help agents execute their missions efficiently.

## 📍 Field Location
- **Base**: HSR Layout, Bengaluru
- **Type**: In-office internship
- **Division**: Technical Operations

## 🎭 Your Mission (Should You Choose to Accept It)

### Primary Objectives
- 🛠️ **System Development**: Design and implement new gadget management features
- 💻 **Code Mastery**: Write efficient code in Node.js and TypeScript
- 🗃️ **Data Operations**: Handle complex database operations (PostgreSQL)
- 🤝 **Team Collaboration**: Work with field agents and tech specialists
- ☁️ **Cloud Operations**: Deploy and maintain AWS infrastructure
- 🔍 **Problem Solving**: Tackle mission-critical technical challenges

### Technical Requirements (Agent Qualifications)
- 🚀 Strong passion for covert tech operations
- 💡 Proficiency in Node.js and TypeScript/Javascript
- 📊 Experience with PostgreSQL and database operations
- 🧩 Advanced problem-solving capabilities
- 📡 Excellent communication skills
- ⭐ Bonus Expertise: Elasticsearch, Redis, AWS

## 🎓 Training Program

### Phase 1: Initial Assessment
- Complete technical evaluation mission
- Submit mission dossier (resume)
- Provide field experience letter (cover letter)

### Phase 2: Field Integration
- Join elite tech division
- Hands-on mission training
- Real-world operation exposure

## 📋 Application Protocol

1. **Mission Assignment**: Complete the coding challenge
2. **Documentation**: Submit your:
   - Completed assignment
   - Agent profile (resume)
   - Mission statement (cover letter)

## 🔒 Security Clearance Process

Selected agents will undergo:
- Technical assessment
- Background verification
- Team compatibility evaluation

---

*This message will NOT self-destruct. We maintain high standards in documentation.*

[Apply Now](mailto:recruitment@imf-tech.com) | [View Assignment](https://assignment-url.com)

---

🌐 **Mission: Accomplished!** 🌐
