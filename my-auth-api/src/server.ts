import mongoose from 'mongoose';
import app from './app';
import config from './config';

const PORT = process.env.PORT || config.port || 3001;

mongoose.connect(config.db.uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });