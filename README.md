# IMF Gadget Management API 🕵️‍♂️

[![Built for](https://img.shields.io/badge/Built%20for-Upraised%20Assignment-blue.svg)]()
[![Role](https://img.shields.io/badge/Role-Backend%20Intern-orange.svg)]()
[![Status](https://img.shields.io/badge/Status-Completed-success.svg)]()

> This project was developed as part of the Upraised Backend Engineering Internship application process.

## 📑 Table of Contents
- [Assignment Overview](#-assignment-overview)
- [System Architecture](#-system-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Documentation](#-api-documentation)
- [Setup Guide](#-setup-guide)
- [Examples](#-examples)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Maintenance](#-maintenance)
- [Troubleshooting](#-troubleshooting)
- [Contact](#-contact)

## 🎯 Assignment Overview

Developed a sophisticated REST API for managing Mission: Impossible Force's gadget inventory system, demonstrating:

✅ RESTful API Implementation
✅ Database Integration
✅ Authentication System
✅ Documentation
✅ Testing
✅ Clean Code Practices
✅ Error Handling
✅ Deployment

## 🔄 System Architecture

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

### System Components
1. **Client Layer**: Handles API requests and user interactions
2. **Auth Layer**: Manages JWT authentication and authorization
3. **API Layer**: Processes business logic and request handling
4. **Database**: Stores application data using PostgreSQL
5. **Logging**: Tracks system events and user activities

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

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT, bcrypt
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Deployment**: Docker, Railway

## 📚 API Documentation

### Base URLs
- **Production**: https://imf-gadget-api.com
- **Documentation**: [Swagger UI](https://imf-gadget-api-ue70.onrender.com/api-docs/)
- **Development**: http://localhost:5000

### Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### Gadgets
- `GET /gadgets` - List all gadgets
- `GET /gadgets?status=Available` - Filter by status
- `POST /gadgets` - Create new gadget
- `PATCH /gadgets/:id` - Update gadget
- `DELETE /gadgets/:id` - Decommission gadget
- `POST /gadgets/:id/self-destruct` - Trigger self-destruct
- `POST /gadgets/:id/maintenance` - Perform maintenance

#### Users
- `POST /users/register` - Register new user
- `POST /auth/login` - User login
- `GET /users/me` - Get current user
- `PATCH /users/me` - Update profile
- `POST /users/me/change-password` - Change password

## 🚀 Setup Guide

### Prerequisites
- Node.js v14+
- PostgreSQL v12+
- npm/yarn

### Installation Steps
1. Clone repository
```sh
git clone <repo_url>
cd imf-gadget-api
```

2. Install dependencies
```sh
npm install
```

3. Configure environment
```sh
cp .env.example .env
# Edit .env with your details
```

4. Setup database
```sh
npm run db:migrate
npm run db:seed
```

5. Start server
```sh
npm run dev  # Development
npm start    # Production
```

## 📝 Examples

### Create Gadget
```json
POST /gadgets
{
  "name": "The Shadow Net Hub",
  "status": "Available",
  "reliability": 0.88,
  "category": "Communication",
  "powerLevel": 85,
  "description": "Portable satellite uplink",
  "technicalSpecs": {
    "powerSource": "Solar Battery",
    "activeTime": "24 hours"
  }
}
```

### Response Examples
```json
// Success Response
{
  "status": "success",
  "data": {
    "id": "g123",
    "name": "The Shadow Net Hub",
    "status": "Available"
  }
}

// Error Response
{
  "status": "error",
  "code": "UNAUTHORIZED",
  "message": "Invalid authentication token"
}
```

## 🧪 Testing

```sh
npm test                 # Unit tests
npm run test:integration # Integration tests
npm run test:security    # Security tests
```

## 📦 Deployment

### Using Docker
```sh
docker-compose up --build
```

### Environment Variables
```properties
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/imf_db
JWT_SECRET=your-secret-key
```

## 🛠️ Maintenance

### Logging
- Application logs: `logs/app.log`
- Error logs: `logs/error.log`
- Access logs: `logs/access.log`

### Database
- Regular backups configured
- Automated cleanup jobs
- Performance monitoring

## 🔧 Troubleshooting

Common Issues:
1. **Database Connection**
   ```sh
   # Check PostgreSQL status
   sudo service postgresql status
   ```

2. **Authentication Issues**
   - Verify JWT_SECRET in .env
   - Check token expiration
   - Ensure correct token format

3. **Performance Issues**
   - Check database indexes
   - Monitor API response times
   - Review server resources

## 👤 Contact Information

- **Name**: [Your Name]
- **Email**: [Your Email]
- **LinkedIn**: [Your Profile]
- **GitHub**: [Your GitHub]
- **Portfolio**: [Your Portfolio]

---

💼 Completed as part of Upraised Backend Engineering Internship application.

*This documentation is maintained with high standards and updated regularly.*
