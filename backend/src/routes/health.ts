import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/', async (_req: Request, res: Response) => {
  try {
    const healthCheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };

    res.status(200).json({
      success: true,
      data: healthCheck,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: { message: 'Service Unavailable' },
    });
  }
});

export default router; 