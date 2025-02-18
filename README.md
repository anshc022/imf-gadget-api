```ascii
  _____  __  __ _____    _____           _            _        _    _____ _____ 
 |_   _||  \/  |  ___]  / ____|         | |          | |      / \  |  __ \_   _|
   | |  | \  / | |__   | |  __  __ _  __| | __ _  ___| |_    /   \ | |__) || |  
   | |  | |\/| |  __|  | | |_ |/ _` |/ _` |/ _` |/ _ \ __|  / /_\ \|  ___/ | |  
  _| |_ | |  | | |     | |__| | (_| | (_| | (_| |  __/ |_  / _____ \ |    _| |_ 
 |_____||_|  |_|_|      \_____|\__,_|\__,_|\__, |\___|\__|/_/     \_\_|   |_____|
                                             __/ |                                  
                                            |___/                                   
```

[![Build Status](https://github.com/imf/gadget-api/actions/workflows/main.yml/badge.svg)](https://github.com/imf/gadget-api/actions)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://semver.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Security](https://img.shields.io/badge/SECURITY-MAX%20LEVEL-red.svg)](SECURITY.md)
[![Mission Status](https://img.shields.io/badge/MISSION-ACTIVE-success.svg)](STATUS.md)

📚 **API Documentation**: [Swagger UI](https://imf-gadget-api-ue70.onrender.com/api-docs/)

> "Your mission, should you choose to accept it, is to manage the IMF's most sophisticated gadget inventory system."

## 📑 Table of Contents
- [System Flow](#-system-flow)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
- [API Documentation](#-api-documentation)
- [Examples](#-examples)
- [Testing](#-testing)
- [Maintenance](#️-maintenance)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 📊 Mission Status Dashboard

| Service Status | Database Health | Active Agents | Gadget Count |
|---------------|----------------|---------------|--------------|
| ✅ Operational | ✅ Connected    | 42 Online     | 156 Active   |

## 🔄 System Flow

```mermaid
graph TB
    subgraph "Mission Control"
        A[Field Agent] -->|Authentication| B{Security Check}
        B -->|Cleared| C[Command Center]
        B -->|Denied| D[Self Destruct]
    end
    
    subgraph "Gadget Operations"
        C --> E[Inventory Control]
        C --> F[Maintenance Hub]
        C --> G[Mission Assignment]
    end
    
    subgraph "Data Vault"
        E --> H[(Secure Database)]
        F --> H
        G --> H
        H --> I[Audit Log]
    end

    style A fill:#ff9900
    style B fill:#red
    style C fill:#00ff00
    style H fill:#0000ff
```

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

## ⚡ Quick Start

```bash
# Clone the repository (This message will self-destruct in 5 seconds)
git clone https://github.com/imf/gadget-api.git

# Install dependencies (Clearance Level 3 Required)
npm install --silent

# Initialize the secure database
npm run init:vault

# Deploy to field operations
npm run deploy:stealth
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

## 🎯 Mission Critical Features

### 🔐 Security Clearance Levels

| Level | Codename    | Access Rights                    |
|-------|------------|----------------------------------|
| 5     | DIRECTOR   | Full System Control              |
| 4     | COMMANDER  | Operation Management             |
| 3     | AGENT      | Field Operations                 |
| 2     | TECHNICIAN | Maintenance & Support            |
| 1     | RECRUIT    | Basic Access                     |

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

## 🌍 Global Deployment Zones

```mermaid
graph LR
    HQ[IMF HQ] --> EU(Europe Hub)
    HQ --> AS(Asia Hub)
    HQ --> NA(North America Hub)
    
    subgraph "Secure Zones"
        EU --> EU_V[EU Vault]
        AS --> AS_V[Asia Vault]
        NA --> NA_V[NA Vault]
    end
```

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

---

🌐 **Mission: Accomplished!** 🌐
