const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEmotion = async (req, res) => {
  const userId = req.user.id;
  const { emoji } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 날짜만 비교

  try {
    // 이미 오늘 감정 기록했는지 확인
    const existing = await prisma.emotion.findUnique({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
    });

    if (existing) {
      return res.status(409).json({ message: '오늘은 이미 감정을 기록했습니다.' });
    }

    // 기록 없으면 생성
    const emotion = await prisma.emotion.create({
      data: {
        userId,
        emoji,
        date: today,
      },
    });

    return res.status(201).json({ message: '감정이 저장되었습니다.', emotion });
  } catch (error) {
    console.error('❌ 감정 저장 오류:', error);
    return res.status(500).json({ message: '감정 저장 중 서버 오류 발생' });
  }
};

module.exports = { createEmotion };
