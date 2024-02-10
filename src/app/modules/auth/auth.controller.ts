import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);

    const { refreshToken, ...others } = result;

    //set refresh token in to browser cookies

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    // if ('refreshToken' in result) {
    //   delete result.refreshToken;
    // }

    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Logged in successfully!',
      data: others,
    });
  }
);
const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    //set refresh token in to browser cookies

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Logged in successfully!',
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
};
