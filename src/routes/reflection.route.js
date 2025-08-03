const express = require('express');
const router = express.Router();
const { createReflection, getReflections } = require('../controllers/reflection.controller');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Reflections
 *   description: 회고 API
 */

/**
 * @swagger
 * /reflections:
 *   post:
 *     summary: 회고 작성
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 오늘은 프로젝트를 마무리했다.
 *     responses:
 *       201:
 *         description: 회고 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회고가 성공적으로 저장되었습니다.
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
router.post('/', authenticateToken, createReflection);

/**
 * @swagger
 * /reflections:
 *   get:
 *     summary: 회고 목록 조회
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 회고 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reflections:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
router.get('/', authenticateToken, getReflections);

module.exports = router;
