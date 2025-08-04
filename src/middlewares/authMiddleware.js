require('dotenv').config(); // 꼭 필요

const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client'); // 실제 경로에 맞게 유지

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('🧪 Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '토큰 없음 또는 형식 오류' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer" 다음 토큰 추출

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ 디코딩된 토큰:', decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    }; // 이후 미들웨어나 컨트롤러에서 req.user로 접근 가능

    next();
  } catch (err) {
    console.error('❌ JWT 인증 실패:', err.message);
    return res.status(401).json({ message: '유효하지 않은 토큰' });
  }
};

module.exports = { authenticateToken: authMiddleware };