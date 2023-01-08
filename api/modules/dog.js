import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:id?', async ({ session, params, paginate }, res) => {
  if (session.user_id) {
    let result;
    if (params.id === 'userrequest') {
      result = await prisma.dog.findMany({
        ...paginate,
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          request: {
            creatorId: parseInt(session.user_id),
          },
        },
        include: {
          images: true,
          request: {
            include: {
              creator: true,
            },
          },
        },
      });
    } else if (params.id == 'wardrequests') {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user_id,
        },
        include: {
          admin: true,
          councillor: true,
        },
      });
      if (user.councillor) {
        const usersOfWard = await prisma.user.findMany({
          select: {
            id: true,
          },
          where: {
            wardNumber: user.councillor.wardNumber,
          },
        });
        const userIdsOfWard = usersOfWard.map((user) => user.id);

        result = await prisma.dog.findMany({
          ...paginate,
          orderBy: {
            createdAt: 'asc',
          },
          where: {
            request: {
              creatorId: {
                in: userIdsOfWard,
              },
            },
          },
          include: {
            images: true,
            request: {
              include: {
                creator: true,
              },
            },
          },
        });
      } else {
        res.status(403).json({
          error: true,
          message: 'You are not a councillor of any ward',
        });
        return;
      }
    } else if (params.id) {
      result = await prisma.dog.findUnique({
        where: {
          id: parseInt(params.id),
        },
        include: {
          images: true,
          request: {
            include: {
              creator: true,
            },
          },
        },
      });
    } else {
      result = await prisma.dog.findMany({
        ...paginate,
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          images: true,
          request: {
            include: {
              creator: true,
            },
          },
        },
      });
    }
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

router.post(`/request`, async (req, res) => {
  if (req.session.user_id) {
    try {
      const request = req.body;
      const dogs = request.dogs;
      delete request.dogs;

      request.creatorId = req.session.user_id;
      request.dogs = {
        create: dogs.map((dog) => {
          return {
            ...dog,
            price: parseFloat(dog.price) || 0,
            age: parseInt(dog.age),
            images: {
              create: dog.images,
            },
          };
        }),
      };

      const result = await prisma.request.create({
        data: request,
      });

      res.json({
        data: result,
      });
    } catch (e) {
      res.status(503).json({
        error: true,
        message: e.message,
      });
    }
  } else {
    res.sendStatus(403);
  }
});

export default router;
