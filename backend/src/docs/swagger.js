import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Assignment API',
      version: '1.0.0',
      description: 'Role-based task API with JWT auth',
    },
    servers: [{ url: 'http://localhost:5000/api/v1' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
          },
        },
      },
    },
  },
  apis: [],
});
