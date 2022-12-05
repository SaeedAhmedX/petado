// index.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import session from 'express-session';

const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // middleware

app.use(
  // middleware
  session({
    secret: 'something',
    resave: false,
    saveUninitialized: true,
  })
);

// index.js
app.post(`/user`, async (req, res) => {
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

app.post(`/user/login`, async (req, res) => {
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

app.get(`/user/details`, async (req, res) => {
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

app.get(`/user/details`, async (req, res) => {
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
    res.sendStatus(403);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
