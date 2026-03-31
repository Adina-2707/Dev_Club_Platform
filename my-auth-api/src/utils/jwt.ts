import jwt from 'jsonwebtoken';
import config from '../config';

const secretKey = config.jwt.secret;

export const signToken = (userId: string) => {
    const payload = { id: userId };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};