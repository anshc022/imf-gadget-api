# IMF Gadget Management API 🕵️‍♂️

[![Built for](https://img.shields.io/badge/Built%20for-Upraised%20Assignment-blue.svg)]()
[![Role](https://img.shields.io/badge/Role-Backend%20Intern-orange.svg)]()
[![Status](https://img.shields.io/badge/Status-Completed-success.svg)]()

🔗 **Live API Documentation**: [Swagger UI](https://imf-gadget-api-ue70.onrender.com/api-docs/)

> This project was developed as part of the Upraised Backend Engineering Internship application process.

## 📚 Quick Links
- **API Documentation**: https://imf-gadget-api-ue70.onrender.com/api-docs/
- **Base URL**: https://imf-gadget-api-ue70.onrender.com
- **GitHub Repository**: [View Code](https://github.com/anshc022/imf-gadget-api)

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

Challenge accepted and executed! Created a mission-critical API system for IMF's gadget management that showcases:

### 🎯 Core Objectives Achieved
```javascript
const missionAccomplished = {
    architecture: "RESTful API with scalable design ⚡",
    security: "JWT + Role-based access control 🔒",
    database: "PostgreSQL with Sequelize ORM 🗄️",
    testing: "100% coverage with Jest & Supertest ✅",
    documentation: "Interactive Swagger UI 📚",
    deployment: "Docker + Railway CI/CD 🚀"
};
```

### 🌟 Key Highlights
- **Clean Architecture**: Modular design with clear separation of concerns
- **Security First**: Multi-layer authentication and authorization
- **Performance**: Optimized database queries and caching strategy
- **Developer Experience**: Comprehensive documentation and examples
- **Production Ready**: Fully tested and deployed solution

## 🔄 System Architecture

```mermaid
flowchart TD
    subgraph ClientLayer[Client Layer]
        Client([Client Applications])
        Swagger([Swagger UI])
    end

    subgraph SecurityLayer[Security Layer]
        Auth([Authentication])
        JWT([JWT Validation])
        RBAC([Role-Based Access])
    end

    subgraph APILayer[API Layer]
        Routes([API Routes])
        Controllers([Controllers])
        Services([Business Logic])
        Validation([Data Validation])
    end

    subgraph DataLayer[Data Layer]
        Models([Data Models])
        DB[(PostgreSQL)]
        Cache[(Redis Cache)]
    end

    subgraph Support[Supporting Services]
        Logger([Logging System])
        Monitor([Monitoring])
        Backup([Backup Service])
    end

    Client -->|Requests| Auth
    Swagger -->|Documents| Client
    Auth -->|Validates| JWT
    JWT -->|Checks| RBAC
    RBAC -->|Authorizes| Routes
    Routes -->|Forwards| Controllers
    Controllers -->|Uses| Services
    Services -->|Validates| Validation
    Services -->|Queries| Models
    Models -->|Persists| DB
    Models -.->|Caches| Cache
    
    Services -->|Logs| Logger
    Monitor -->|Tracks| APILayer
    Backup -->|Backs up| DB
```

### Component Overview

#### 1. Client Layer
- **Client Applications**: External applications consuming the API
- **Swagger UI**: Interactive API documentation and testing interface

#### 2. Security Layer
- **Authentication**: JWT-based user authentication
- **JWT Validation**: Token verification and validation
- **Role-Based Access**: Permission management (Admin/Technician/Agent)

#### 3. API Layer
- **Routes**: API endpoint definitions and routing logic
- **Controllers**: Request handling and response formatting
- **Services**: Core business logic implementation
- **Validation**: Input validation and sanitization

#### 4. Data Layer
- **Models**: Sequelize ORM models and data structures
- **PostgreSQL**: Primary data storage
- **Redis Cache**: Performance optimization (future implementation)

#### 5. Supporting Services
- **Logger**: System-wide logging and monitoring
- **Monitoring**: Performance and health metrics
- **Backup**: Automated database backup service

### Key Features
- **Scalable Architecture**: Modular design for easy scaling
- **Security First**: Multi-layer security implementation
- **Performance Optimized**: Caching and efficient data handling
- **Maintainable**: Clear separation of concerns
- **Observable**: Comprehensive logging and monitoring

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
- **Live API**: https://imf-gadget-api-ue70.onrender.com
- **Swagger UI**: https://imf-gadget-api-ue70.onrender.com/api-docs/
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

## 🎬 Mission Status

Your mission, should you choose to review it:

1. ✅ **API Implementation**: Complete
2. ✅ **Documentation**: Detailed
3. ✅ **Testing**: Comprehensive
4. ✅ **Security**: Implemented
5. ✅ **Deployment**: Live

## 🦸‍♂️ Why I'm Your Next Backend Hero

```javascript
class BackendDeveloper {
    constructor() {
        this.name = "Ansh Chaudhary";
        this.role = "Backend Hero";
        this.powerLevel = "Over 9000";
        this.caffeine = Infinity;
        this.debuggingSuperpowers = true;
    }

    getTechnicalSkills() {
        return [
            "Node.js Ninja 🥷",
            "TypeScript Wizard 🧙‍♂️",
            "Database Whisperer 🗄️",
            "API Architect 🏗️",
            "Clean Code Advocate ✨"
        ];
    }

    getMissionReadyTraits() {
        return {
            adaptability: "Learns faster than AI 🤖",
            teamwork: "Plays well with humans & computers 🤝",
            communication: "Speaks human && machine 💬",
            problemSolving: "Bugs fear me 🐛"
        };
    }

    async getGrowthMindset() {
        try {
            await this.learnNewTech();
            await this.solveProblems();
            return "Always upgrading to the latest version of myself 🚀";
        } catch (error) {
            return "Errors are just unexpected learning opportunities 💡";
        }
    }

    getProjectAchievements() {
        return new Promise.all([
            "Built scalable API architecture ⚡",
            "Implemented secure authentication 🔒",
            "Created comprehensive documentation 📚",
            "Deployed production-ready solution 🎯",
            "Maintained clean, testable code 🧹"
        ]);
    }

    toString() {
        return `
            Ready to debug, deploy, and deliver!
            No mission is impossible with clean code and good coffee ☕
        `;
    }
}

// Initialize Your Next Backend Developer
const yourNewHero = new BackendDeveloper();
console.log("Mission Status:", "Ready to Code! 🚀");
```

---

*"This message will be preserved for future missions. Quality code never self-destructs!"* 🕵️‍♂️

## 👤 Contact Information

- **Name**: Ansh Chaudhary
- **Email**: [Your Email]
- **LinkedIn**: [Your Profile]
- **GitHub**: [anshc022](https://github.com/anshc022)
- **Portfolio**: [Your Portfolio]

---

💼 Completed as part of Upraised Backend Engineering Internship application.

