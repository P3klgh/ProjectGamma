import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = registerSchema.parse(req.body);

    // Hash password
    const saltRounds = 12;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _hashedPassword = await bcrypt.hash(password, saltRounds);

    // In a real app, you would save to database here using hashedPassword
    // For now, we'll just return a mock response
    const token = jwt.sign(
      { id: 'mock-id', email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: 'mock-id',
          email,
          firstName,
          lastName,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: { message: 'Validation error', details: error.errors },
      });
    }

    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
    });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // In a real app, you would fetch user from database here
    // For now, we'll use mock data
    const mockUser = {
      id: 'mock-id',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 12),
      firstName: 'John',
      lastName: 'Doe',
    };

    // Check if user exists and password is correct
    if (email !== mockUser.email || !(await bcrypt.compare(password, mockUser.password))) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid credentials' },
      });
    }

    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: { message: 'Validation error', details: error.errors },
      });
    }

    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
    });
  }
});

export default router; 