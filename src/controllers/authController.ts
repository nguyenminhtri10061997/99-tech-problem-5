import { Request, Response } from 'express';
import AuthService from '../services/authService';

const authService = new AuthService()
export class AuthController {

    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const token = await authService.login(username, password);

        if (!token) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        res.status(201).json({ token });
    }
}