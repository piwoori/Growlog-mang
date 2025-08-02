const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const authRouter = require('./routes/auth.route');
const todoRouter = require('./routes/todo.route');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 🔐 Swagger 자동 토큰 주입 설정
const swaggerToken = `${process.env.SWAGGER_SAMPLE_TOKEN}`;
const swaggerOptions = {
  swaggerOptions: {
    authAction: {
      bearerAuth: {
        name: "bearerAuth",
        schema: {
          type: "http",
          in: "header",
          name: "Authorization",
          scheme: "bearer",
        },
        value: swaggerToken,
      },
    },
  },
};

// 🛣️ 라우터 등록
app.use('/auth', authRouter);
app.use('/todos', authMiddleware, todoRouter);

// 📘 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// ✅ 기본 라우트
app.get('/', (req, res) => {
  res.send('🪴 Welcome to Growlog API!');
});

module.exports = app;
