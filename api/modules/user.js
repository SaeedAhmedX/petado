import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post(`/`, async (req, res) => {
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
        lastLogin: new Date(),
      },
    });
    req.session.user_id = result.id;
    res.json(result);
  } catch (e) {
    res.status(503).json({
      error: true,
      message: e.message,
    });
  }
});

router.post(`/login`, async (req, res) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!result) {
      res.status(503).json({
        error: true,
        message: 'Invalid user name or password',
      });
    } else {
      req.session.user_id = result.id;
      res.json(result);
    }
  } catch (e) {
    res.status(503).json({
      error: true,
      message: e.message,
    });
  }
});

router.get(`/details`, async (req, res) => {
  if (req.session.user_id) {
    const result = await prisma.user.findUnique({
      where: {
        id: req.session.user_id,
      },
    });

    res.json({
      data: result,
    });
  } else {
    res.status(403).json({
      error: true,
      message: 'Permission denied',
    });
  }
});

export default router;
