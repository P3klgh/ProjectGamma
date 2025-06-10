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
