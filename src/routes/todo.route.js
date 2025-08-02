// src/routes/todo.route.js

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: 할 일 관리 API
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: 할 일 생성
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: 생성된 할 일을 반환
 *       500:
 *         description: 서버 오류
 */
router.post('/', authMiddleware, todoController.createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: 로그인한 유저의 할 일 전체 또는 필터 조회
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: done
 *         schema:
 *           type: boolean
 *         description: true 또는 false로 완료 여부 필터
 *     responses:
 *       200:
 *         description: 할 일 배열 반환
 *       500:
 *         description: 서버 오류
 */
router.get('/', authMiddleware, todoController.getTodos);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: 할 일 수정
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               isDone:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 수정된 할 일을 반환
 *       404:
 *         description: 존재하지 않는 ID
 *       500:
 *         description: 서버 오류
 */
router.put('/:id', authMiddleware, todoController.updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: 할 일 삭제
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 완료 메시지
 *       404:
 *         description: 존재하지 않는 ID
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
