import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handelCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error?.path,
      message: 'Invalid Id Given!',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'CastError Error!',
    errorMessages: errors,
  };
};
export default handelCastError;
