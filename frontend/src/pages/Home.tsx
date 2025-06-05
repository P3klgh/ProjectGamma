import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="animate-fade-in">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to ProjectGamma
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern full-stack web application built with TypeScript, React, Node.js, Express, PostgreSQL, and Docker.
        </p>
        
        {user ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Hello, {user.firstName}! Welcome back.
            </p>
            <div className="space-x-4">
              <Link
                to="/dashboard"
                className="btn btn-primary"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/profile"
                className="btn btn-secondary"
              >
                View Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/register"
              className="btn btn-primary"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="btn btn-secondary"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-3">🚀 Modern Stack</h3>
          <p className="text-gray-600">
            Built with the latest technologies including React 18, TypeScript, and Node.js
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-3">🐳 Docker Ready</h3>
          <p className="text-gray-600">
            Fully containerized with Docker for easy deployment and scaling
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-3">🔒 Secure</h3>
          <p className="text-gray-600">
            JWT authentication, password hashing, and security best practices
          </p>
        </div>
      </div>
    </div>
  );
}; 