import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('', async ({ session, params, paginate }, res) => {
  if (session.is_admin) {
    let result;

    const councillors = await prisma.councillor.findMany({
      select: { userId: true },
    });
    const councillorIds = councillors.map((councillor) => councillor.userId);

    result = await prisma.user.findMany({
      ...paginate,
      where: {
        id: {
          in: councillorIds,
        },
      },
      include: {
        admin: true,
        councillor: true,
      },
      orderBy: {
        email: 'asc',
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

async function getSingleUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
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

router.post(`/checkcoucillorstatus/:force?`, async (req, res) => {
  if (req.session.is_admin) {
    try {
      const { email, wardNumber } = req.body;

      const user = await getSingleUserByEmail(email);
      if (req.params.force) {
        await prisma.councillor.delete({
          where: {
            wardNumber,
          },
        });

        const result = await prisma.councillor.create({
          data: {
            wardNumber,
            userId: user.id,
          },
        });
        res.status(200).json({
          error: false,
          data: result,
        });
      } else {
        const wardCouncillor = await prisma.councillor.findFirst({
          where: {
            wardNumber,
          },
          include: {
            user: true,
          },
        });
        let message;

        if (!!wardCouncillor) {
          message =
            'There is already a Councillor assigned on this ward. Would you like to override it?';
        }

        res.json({
          data: {
            user,
            inputs: { email, wardNumber },
            message,
          },
        });
      }
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
