import request from 'supertest';
import app from '../src/app';
import { AuthService } from '../src/services/authService';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('registers a new user successfully', async () => {
  jest.spyOn(AuthService.prototype, 'registerUser').mockResolvedValue(undefined);

  const response = await request(app)
    .post('/api/auth/register')
    .send({ email: 'new@example.com', password: 'password123' });

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('User registered successfully');
});

test('logs in successfully', async () => {
  jest.spyOn(AuthService.prototype, 'validateUser').mockResolvedValue(true);
  jest.spyOn(AuthService.prototype, 'generateToken').mockReturnValue('mockToken');

  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password123' });

  expect(response.status).toBe(200);
  expect(response.body.token).toBe('mockToken');
});