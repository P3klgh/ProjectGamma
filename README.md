# ProjectGamma - Full Stack Web Application

A modern full-stack web application boilerplate built with TypeScript, React, Node.js, Express, PostgreSQL, and Docker.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with TypeScript
- **Express.js** framework
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** for authentication
- **bcrypt** for password hashing

### DevOps & Tools
- **Docker** & Docker Compose
- **ESLint** & **Prettier** for code quality
- **Jest** for testing
- **GitHub Actions** for CI/CD

## 🏗️ Architecture Overview

The following diagram illustrates the complete application architecture, including middleware layers, security components, and data flow:

```mermaid
graph TB
    %% User and Browser Layer
    User["👤 User"] --> Browser["🌐 Browser"]
    
    %% CI/CD Layer
    GitHubActions["⚙️ GitHub Actions<br/>(CI/CD Pipeline)"] --> DockerCompose["🐳 Docker Compose<br/>(Multi-Service Orchestration)"]
    
    %% Container Orchestration
    DockerCompose --> FrontendContainer["📦 Frontend Container<br/>(React + Vite)"]
    DockerCompose --> BackendContainer["📦 Backend Container<br/>(Node.js + Express)"]
    DockerCompose --> DatabaseContainer["📦 Database Container<br/>(PostgreSQL 15-Alpine)"]
    DockerCompose --> AdminerContainer["📦 Adminer Container<br/>(DB Admin UI)"]
    
    %% Frontend Layer
    Browser --> NginxFrontend["🔄 NGINX<br/>(Frontend Proxy)"]
    NginxFrontend --> ReactApp["⚛️ React App<br/>(TypeScript + Tailwind)"]
    
    %% React Application Structure
    ReactApp --> ReactRouter["🛣️ React Router<br/>(Client-side Routing)"]
    ReactRouter --> AuthProvider["🔐 Auth Provider<br/>(Context API)"]
    
    %% React Components and Pages
    AuthProvider --> PublicRoutes["📄 Public Routes<br/>/ → Home<br/>/login → Login<br/>/register → Register"]
    AuthProvider --> ProtectedRoute["🛡️ Protected Route<br/>(Auth Guard)"]
    ProtectedRoute --> PrivateRoutes["🔒 Private Routes<br/>/dashboard → Dashboard<br/>/profile → Profile"]
    
    %% Frontend to Backend Communication
    ReactApp --> AxiosClient["📡 Axios Client<br/>(HTTP Requests)"]
    AxiosClient --> BackendProxy["🔄 NGINX Reverse Proxy<br/>(Backend Load Balancer)"]
    
    %% Backend Security Middleware Stack
    BackendProxy --> ExpressApp["🚀 Express.js Server<br/>(Port 5000)"]
    ExpressApp --> SecurityMiddleware["🛡️ Security Middleware Stack"]
    
    %% Detailed Middleware Chain
    SecurityMiddleware --> Helmet["⛑️ Helmet<br/>(Security Headers)"]
    SecurityMiddleware --> CORS["🌐 CORS<br/>(Cross-Origin Policy)"]
    SecurityMiddleware --> RateLimit["⏱️ Rate Limiting<br/>(100 req/15min)"]
    SecurityMiddleware --> Morgan["📝 Morgan<br/>(HTTP Logging)"]
    SecurityMiddleware --> BodyParser["📝 Body Parser<br/>(JSON/URL Encoded)"]
    
    %% API Routing
    SecurityMiddleware --> APIRoutes["🛣️ API Routes<br/>(v1 Versioning)"]
    APIRoutes --> HealthRoute["/api/v1/health<br/>📊 Health Check"]
    APIRoutes --> AuthRoute["/api/v1/auth<br/>🔐 Authentication<br/>POST /login<br/>POST /register<br/>POST /refresh"]
    APIRoutes --> UserRoute["/api/v1/users<br/>👤 User Management<br/>GET /profile<br/>PUT /profile<br/>DELETE /account"]
    
    %% Authentication Middleware
    AuthRoute --> JWTMiddleware["🔑 JWT Middleware<br/>(Token Validation)"]
    UserRoute --> JWTMiddleware
    
    %% Controllers Layer
    AuthRoute --> AuthController["🎮 Auth Controller<br/>(Login/Register Logic)"]
    UserRoute --> UserController["🎮 User Controller<br/>(CRUD Operations)"]
    
    %% Service Layer
    AuthController --> AuthService["⚙️ Auth Service<br/>(Business Logic)"]
    UserController --> UserService["⚙️ User Service<br/>(Business Logic)"]
    
    %% Database Layer
    AuthService --> PrismaClient["💎 Prisma Client<br/>(ORM + Query Builder)"]
    UserService --> PrismaClient
    
    %% Database Models
    PrismaClient --> PostgreSQL["🐘 PostgreSQL Database<br/>(Port 5432)"]
    PostgreSQL --> UserModel["👤 User Model<br/>id, email, firstName<br/>lastName, password<br/>createdAt, updatedAt"]
    PostgreSQL --> PostModel["📝 Post Model<br/>id, title, content<br/>published, authorId<br/>createdAt, updatedAt"]
    PostgreSQL --> ProfileModel["👤 Profile Model<br/>id, bio, avatar<br/>userId (FK)"]
    
    %% Database Relationships
    UserModel --> PostModel
    UserModel --> ProfileModel
    
    %% Error Handling
    ExpressApp --> ErrorHandler["❌ Error Handler<br/>(Global Error Middleware)"]
    ExpressApp --> NotFoundHandler["❓ 404 Handler<br/>(Route Not Found)"]
    
    %% Development Tools
    FrontendContainer --> ViteDevServer["⚡ Vite Dev Server<br/>(HMR + Fast Reload)"]
    BackendContainer --> NodemonDev["🔄 Nodemon<br/>(Auto Restart)"]
    
    %% Testing Layer
    ReactApp --> JestFrontend["🧪 Jest + RTL<br/>(Frontend Testing)"]
    ExpressApp --> JestBackend["🧪 Jest + Supertest<br/>(Backend Testing)"]
    
    %% Code Quality
    ReactApp --> ESLintFrontend["📋 ESLint + Prettier<br/>(Code Quality)"]
    ExpressApp --> ESLintBackend["📋 ESLint + Prettier<br/>(Code Quality)"]
    
    %% Environment Configuration
    DockerCompose --> EnvConfig["⚙️ Environment Config<br/>DATABASE_URL<br/>JWT_SECRET<br/>FRONTEND_URL<br/>NODE_ENV"]
    
    %% Network Layer
    FrontendContainer -.-> AppNetwork["🌐 app-network<br/>(Docker Bridge)"]
    BackendContainer -.-> AppNetwork
    DatabaseContainer -.-> AppNetwork
    AdminerContainer -.-> AppNetwork
    
    %% Data Persistence
    DatabaseContainer --> PostgresVolume["💾 postgres_data<br/>(Persistent Volume)"]
    
    %% Admin Interface
    AdminerContainer --> DatabaseContainer
    User --> AdminerInterface["🔧 Adminer UI<br/>(Port 8080)<br/>Database Management"]
    AdminerInterface --> DatabaseContainer
```

**Key Architecture Highlights:**
- **Layered Security**: Multiple middleware layers including Helmet, CORS, and rate limiting
- **Microservices Ready**: Containerized services with proper networking and orchestration
- **Authentication Flow**: JWT-based authentication with protected routes
- **Database Design**: Normalized PostgreSQL schema with Prisma ORM
- **Development Workflow**: Automated testing, linting, and CI/CD pipeline
- **Production Ready**: Load balancing, error handling, and monitoring capabilities

## 📁 Project Structure

```
ProjectGamma/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js TypeScript backend
├── database/          # Database migrations and seeds
├── docker-compose.yml # Multi-service Docker setup
├── .env.example       # Environment variables template
└── README.md         # This file
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- Git

### Quick Start with Docker
1. Clone the repository
2. Copy environment variables: `cp .env.example .env`
3. Start the application: `docker-compose up -d`
4. Visit http://localhost:3000 for frontend
5. Backend API available at http://localhost:5000

### Development Setup
1. **Install dependencies:**
   ```bash
   # Frontend
   cd frontend && npm install
   
   # Backend  
   cd backend && npm install
   ```

2. **Set up database:**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/projectgamma"

# JWT
JWT_SECRET="your-secret-key"

# App
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

## 🐳 Docker Services

- **frontend**: React app (port 3000)
- **backend**: Express API (port 5000)  
- **database**: PostgreSQL (port 5432)
- **adminer**: Database admin UI (port 8080)

## 🚀 Deployment

The application is containerized and ready for deployment to any Docker-compatible platform like:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Please make sure to:
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Run `npm run lint` and `npm run test` before submitting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means:
- ✅ **Commercial use** - Use this project in commercial applications
- ✅ **Modification** - Modify and adapt the code to your needs  
- ✅ **Distribution** - Share and distribute the code/application
- ✅ **Private use** - Use the project privately
- ❗ **License and copyright notice** - Include the original license and copyright notice in any copy

For more information about the MIT License, visit: https://opensource.org/licenses/MIT
