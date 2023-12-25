// /* eslint-disable no-console */
// /* eslint-disable no-unused-expressions */
// import { ErrorRequestHandler, Request, Response } from 'express';
// import config from '../../config';
// import { IGenericErrorMessage } from '../../interfaces/error';
// import handelValidationError from '../../errors/handleValidationError';
// import { Error } from 'mongoose';
// import ApiError from '../../errors/ApiError';
// import { errorLogger } from '../../shared/logger';
// import { ZodError } from 'zod';
// import handleZodError from '../../errors/handleZodError';
// import handelCastError from '../../errors/handleCastError';

// const globalErrorHandler: ErrorRequestHandler = (
//   error,
//   req: Request,
//   res: Response
// ) => {
//   config.env === 'development'
//     ? console.log('💀 globalErrorHandler~', error)
//     : errorLogger.error('💀 globalErrorHandler~', error);
//   let statusCode = 500;
//   let message = 'Something went wrong!';
//   let errorMessages: IGenericErrorMessage[] = [];

//   if (error?.name === 'ValidationError') {
//     const simplifiedError = handelValidationError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (error instanceof ZodError) {
//     const simplifiedError = handleZodError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (error?.name === 'CastError') {
//     const simplifiedError = handelCastError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (error instanceof ApiError) {
//     statusCode = error?.statusCode;
//     message = error?.message;
//     errorMessages = error?.message
//       ? [
//           {
//             path: '',
//             message: error.message,
//           },
//         ]
//       : [];
//   } else if (error instanceof Error) {
//     message = error?.message;
//     errorMessages = error?.message
//       ? [
//           {
//             path: '',
//             message: error?.message,
//           },
//         ]
//       : [];
//   }
//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorMessages,
//     stack: config.env !== 'production' ? error?.stack : undefined,
//   });
// };
// export default globalErrorHandler;

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, Request, Response } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';

import { ZodError } from 'zod';
import handleCastError from '../../errors/handleCastError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
