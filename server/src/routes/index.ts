import { Router, type Request, type Response } from 'express';

const router = Router();

// Root API Status
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to the API',
    timestamp: new Date().toISOString(),
  });
});

export default router;