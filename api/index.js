import express from 'express';
import session from 'express-session';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import pagination from './middlewares/pagination';
import userRouter from './modules/user';
import dogRouter from './modules/dog';

const app = express();
const upload = multer({ dest: 'uploads/' });
const prisma = new PrismaClient();

// MIDDLEWARES
app.use(express.json()); // middleware
app.use(
  // middleware
  session({
    secret: 'something',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(pagination);

// MODULES
app.use('/users', userRouter);
app.use('/dogs', dogRouter);

// File Uploads
app.post('/upload', upload.array('files'), uploadFiles);
function uploadFiles(req, res) {
  res.json({
    data: req.files.map((file) => {
      return {
        name: file.originalname,
        location: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      };
    }),
  });
}
app.get('/image/:id', async ({ params }, res) => {
  const image = await prisma.dogImage.findFirst({
    where: {
      location: params.id,
    },
  });
  res.setHeader('Content-Type', image.mimeType);
  res.sendFile('/workspace/api/uploads/' + params.id);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
