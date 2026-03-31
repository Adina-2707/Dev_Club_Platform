import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import { signToken } from '../utils/jwt';

export class AuthService {
    async validateUser(email: string, password: string): Promise<boolean> {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) {
            return false;
        }

        return bcrypt.compare(password, user.password);
    }

    async registerUser(email: string, password: string): Promise<void> {
        const existingUser = await UserModel.findOne({ email }).exec();
        if (existingUser) {
            const error = new Error('Email already in use');
            (error as any).statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ email, password: hashedPassword });
    }

    generateToken(userId: string): string {
        return signToken(userId);
    }
}