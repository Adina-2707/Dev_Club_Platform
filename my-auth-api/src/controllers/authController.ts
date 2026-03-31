import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        if (typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ message: 'Email and password must be strings' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long' });
            return;
        }

        try {
            await this.authService.registerUser(email, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        try {
            const isValid = await this.authService.validateUser(email, password);
            if (isValid) {
                const token = this.authService.generateToken(email);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error: any) {
            this.handleError(res, error);
        }
    }

    private handleError(res: Response, error: any): void {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'An error occurred' });
    }
}

export default AuthController;