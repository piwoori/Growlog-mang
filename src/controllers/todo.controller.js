const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 할 일 등록
exports.createTodo = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;

  if (!content) {
    return res.status(400).json({ error: '할 일 내용은 필수입니다.' });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: {
        content,
        userId,
        isDone: false
      }
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할 일 생성 실패' });
  }
};

// 할 일 조회
exports.getTodos = async (req, res) => {
  const userId = req.user.userId;

  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: '할 일 조회 실패' });
  }
};

// 할 일 수정
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { content, isDone } = req.body;
  const userId = req.user.userId;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) }
    });

    if (!todo) {
      return res.status(404).json({ error: '해당 할 일을 찾을 수 없습니다.' });
    }

    if (todo.userId !== userId) {
      return res.status(403).json({ error: '수정 권한이 없습니다.' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { 
        ...(content !== undefined && { content }),
        ...(isDone !== undefined && { isDone })
      }
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '할 일 수정 실패' });
  }
};

// 할 일 삭제
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) }
    });

    if (!todo) {
      return res.status(404).json({ error: '삭제할 할 일이 존재하지 않습니다.' });
    }

    if (todo.userId !== userId) {
      return res.status(403).json({ error: '삭제 권한이 없습니다.' });
    }

    await prisma.todo.delete({
      where: { id: Number(id) }
    });

    res.json({ message: '삭제 완료' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '삭제 실패' });
  }
};
