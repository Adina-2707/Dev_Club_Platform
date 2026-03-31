import express from 'express';
import { json } from 'body-parser';
import { setAuthRoutes } from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(json());
setAuthRoutes(app);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Auth API is running');
});

export default app;