# IMF Gadget Management API 🕵️‍♂️

[![Built for](https://img.shields.io/badge/Built%20for-Upraised%20Assignment-blue.svg)]()
[![Role](https://img.shields.io/badge/Role-Backend%20Intern-orange.svg)]()
[![Status](https://img.shields.io/badge/Status-Completed-success.svg)]()

> This project was developed as part of the Upraised Backend Engineering Internship application process.

## 📑 Table of Contents
- [Assignment Overview](#-assignment-overview)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Setup Guide](#-setup-guide)
- [Testing](#-testing)
- [Deployment](#-deployment)
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

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT, bcrypt
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Deployment**: Docker, Railway

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

## 🚀 Features

### Core Functionality
- Gadget inventory management
- Real-time monitoring
- Maintenance scheduling
- Mission success calculations
- Self-destruct capabilities

### Security
- JWT authentication
- Role-based access control
- Secure password hashing
- Protected endpoints

## 📚 API Documentation

### Base URL
- **Production**: https://imf-gadget-api.com
- **Documentation**: [Swagger UI](https://imf-gadget-api-ue70.onrender.com/api-docs/)

### Key Endpoints
- `GET /gadgets` - List gadgets
- `POST /gadgets` - Create gadget
- `POST /auth/login` - Authentication
- `GET /users/me` - User profile

[View Full API Documentation](https://imf-gadget-api-ue70.onrender.com/api-docs/)

## 🚀 Setup Guide

### Prerequisites
- Node.js v14+
- PostgreSQL v12+
- npm/yarn

### Quick Start
```sh
git clone <repo_url>
cd imf-gadget-api
npm install
cp .env.example .env
npm run setup
npm start
```

## 🧪 Testing

```sh
npm test                 # Unit tests
npm run test:integration # Integration tests
npm run test:security    # Security tests
```

## 📦 Deployment

```sh
docker-compose up --build
```

### Environment Variables
```properties
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@host:port/db
JWT_SECRET=your-secret-key
```

## 👤 Contact Information

- **Name**: [Your Name]
- **Email**: [Your Email]
- **LinkedIn**: [Your Profile]
- **GitHub**: [Your GitHub]

---

💼 Completed as part of Upraised Backend Engineering Internship application.
