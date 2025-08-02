const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  checkNickname,
  getMe,
  deleteAccount,
  getAllUsers, 
} = require('../controllers/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 가입 및 로그인 API
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nickname
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *               nickname:
 *                 type: string
 *                 example: growuser
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 이메일 또는 닉네임 중복
 *       500:
 *         description: 서버 오류
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/check-nickname:
 *   get:
 *     summary: 닉네임 중복 체크
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *         description: 중복 확인할 닉네임
 *     responses:
 *       200:
 *         description: 중복 여부 반환
 *         content:
 *           application/json:
 *             example:
 *               isDuplicate: false
 *       400:
 *         description: 닉네임 미입력
 *       500:
 *         description: 서버 오류
 */
router.get('/check-nickname', checkNickname);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@email.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: 로그인 성공 (JWT 토큰 반환)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: 이메일 또는 비밀번호 불일치
 *       500:
 *         description: 서버 오류
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 유저 정보 조회
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string
 *       401:
 *         description: 인증 실패
 */
router.get('/me', authMiddleware, getMe);

/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 회원 탈퇴 성공 메시지 반환
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
router.delete('/delete', authMiddleware, deleteAccount);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: 전체 유저 목록 조회
 *     tags: [Auth]
 *     description: 현재 가입된 모든 유저의 이메일, 닉네임, ID를 조회합니다.
 *     responses:
 *       200:
 *         description: 유저 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   email:
 *                     type: string
 *                     example: test@email.com
 *                   nickname:
 *                     type: string
 *                     example: growuser
 *       500:
 *         description: 서버 오류
 */
router.get('/users', getAllUsers); // 🔓 테스트용, 인증 없이 열어둠

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: 전체 유저 목록 조회 (관리자 전용)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 목록 반환
 *       403:
 *         description: 관리자 권한 없음
 */
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
