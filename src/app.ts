import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

// Testing root is working
/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error("Testing Error Logger")
}) */

//handle global Error
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

//testing student id generation
/* const academicSemester = {
  code: '01',
  year: '2025',
}; */
/* const testId = async () => {
  const testId = await generateAdminId();
  console.log(testId);
};
testId(); */

export default app;
