const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReflection = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { content } = req.body;

    const newReflection = await prisma.reflection.create({
      data: { content, userId },
    });

    return res.status(201).json({
      message: '회고가 성공적으로 저장되었습니다.',
      reflection: newReflection,
    });
  } catch (error) {
    console.error('❌ 회고 저장 오류:', error);
    return res.status(500).json({ error: '회고 저장 중 오류' });
  }
};

const getReflections = async (req, res) => {
  try {
    const userId = req.user.userId;

    const reflections = await prisma.reflection.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ reflections });
  } catch (error) {
    console.error('❌ 회고 목록 조회 오류:', error);
    return res.status(500).json({ error: '회고 목록 조회 중 오류' });
  }
};

module.exports = { createReflection, getReflections };
