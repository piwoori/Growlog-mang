const express = require('express');
const router = express.Router();
const { createEmotion } = require('../controllers/emotion.controller');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /emotions:
 *   post:
 *     summary: 감정 기록
 *     tags: [Emotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emoji:
 *                 type: string
 *                 example: 😊
 *     responses:
 *       201:
 *         description: 감정 기록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 감정이 저장되었습니다.
 *                 emotion:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     emoji:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *       409:
 *         description: 이미 오늘 감정을 기록함
 *       500:
 *         description: 서버 오류
 */
router.post('/', authenticateToken, createEmotion);

module.exports = router;