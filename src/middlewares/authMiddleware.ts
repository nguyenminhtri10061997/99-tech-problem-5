import { NextFunction, Request, Response } from 'express';
import JwtService from '../utils/JwtService';


export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authorization token is required' });
    return
  }

  try {
    const decoded = JwtService.verifyToken(token);
    req.params.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
