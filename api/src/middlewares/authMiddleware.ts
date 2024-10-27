import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authentication token is missing or invalid' });
        return
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };

        console.log('decoded', decoded.role);

        // Attach user information to the request for further use if needed
        if (typeof decoded !== 'object' || !decoded?.id) {
            res.status(401).json({ error: 'Access denied' });
            return;
          }
          req.userId = decoded.id;
          req.role = decoded.role;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return
    }
}


export function verifySeller(req: Request, res: Response, next: NextFunction) {
    const role = req.role;
    if (role !== 'seller') {
      res.status(401).json({ error: 'Access denied' });
      return;
    }
    next();
  }