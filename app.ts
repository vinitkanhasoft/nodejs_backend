import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorMiddleware } from './middleware/error.middleware.ts';
import routes from './routes/index.ts';
import { requestMiddleware } from './middleware/request.middleware.ts';
import { responseMiddleware } from './middleware/response.middleware.ts';

export const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestMiddleware);

// Routes
app.use('/api', routes);

// Response middleware (before error handling)
app.use(responseMiddleware);

// Error middleware (must be last)
app.use(errorMiddleware);
