import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get current user profile
router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  // In a real app, you would fetch user from database
  const mockUser = {
    id: req.user?.id || 'mock-id',
    email: req.user?.email || 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json({
    success: true,
    data: { user: mockUser },
  });
});

// Get all users (protected route)
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  // Mock users data
  const mockUsers = [
    {
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      createdAt: new Date().toISOString(),
    },
  ];

  res.status(200).json({
    success: true,
    data: { users: mockUsers },
  });
});

export default router; 