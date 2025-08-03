/**
 * @file reflection.controller.js
 * @description 회고(Reflection) 관련 컨트롤러 함수
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 회고 생성
 * @param {*} req - 요청 객체 (req.user.userId, req.body.content 사용)
 * @param {*} res - 응답 객체
 * @returns JSON 응답
 */
const createReflection = async (req, res) => {
  try {
    const userId = req.user.userId; // 인증 미들웨어에서 전달됨
    const { content } = req.body;

    const newReflection = await prisma.reflection.create({
      data: {
        content,
        userId,
      },
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

module.exports = { createReflection };
