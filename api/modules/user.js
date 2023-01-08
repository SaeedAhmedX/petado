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

router.put(`/:id`, async (req, res) => {
  try {
    delete req.body.id;
    delete req.body.updatedAt;
    delete req.body.lastLogin;
    delete req.body.createdAt;
    const result = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...req.body,
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

async function getSingleUser(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      admin: true,
      councillor: true,
    },
  });
  if (user) {
    user.isAdmin = !!user.admin;
    user.isCouncillor = !!user.councillor;
  }
  delete user.password;
  return user;
}

router.post(`/login`, async (req, res) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
      include: {
        admin: true,
        councillor: true,
      },
    });
    if (!result) {
      res.status(503).json({
        error: true,
        message: 'Invalid user name or password',
      });
    } else {
      delete result.password;
      req.session.user_id = result.id;
      req.session.is_admin = !!result.admin;
      req.session.is_councillor = !!result.councillor;
      res.json(result);
    }
  } catch (e) {
    res.status(503).json({
      error: true,
      message: e.message,
    });
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.status(200).json({
    error: false,
    message: 'Success',
  });
});

router.get(`/details`, async (req, res) => {
  if (req.session.user_id) {
    const result = await getSingleUser(req.session.user_id);
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
