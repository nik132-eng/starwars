// src/server/index.ts
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5175;

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

// Only start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;