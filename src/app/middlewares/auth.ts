import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Your are not authorized!');
      }

      //   authenticate user
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifiedToken(
        token,
        config.jwt.jwt_access_secret as Secret
      );

      req.user = verifiedUser;

      //   authorize user
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access');
      }

      next();
      // verifiedToken = jwt.verify(token, config.jwt.jwt_refresh_secret);
    } catch (error) {
      next(error);
    }
  };

export default auth;
