import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'REST API documentation',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
  },
  apis: ['./src/routes/**/*.ts', './src/modules/**/*.ts'],
};

const specs = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
