import { Application, Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

export function setAuthRoutes(app: Application) {
    app.use('/api/auth', router);
    router.get('/register', (_req, res) => {
        res.status(405).json({ message: 'Use POST /api/auth/register with JSON { email, password }' });
    });
    router.get('/login', (_req, res) => {
        res.status(405).json({ message: 'Use POST /api/auth/login with JSON { email, password }' });
    });
    router.post('/login', authController.login.bind(authController));
    router.post('/register', authController.register.bind(authController));
}