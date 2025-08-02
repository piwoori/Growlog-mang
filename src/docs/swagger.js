const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Growlog API',
      version: '1.0.0',
      description: '자기관리 통합 서비스 Growlog의 REST API 문서입니다.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // 주석으로 문서화할 위치
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
