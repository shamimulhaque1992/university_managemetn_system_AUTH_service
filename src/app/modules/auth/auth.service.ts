import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // Using User models instance
  // const user = new User();
  // const isUsrExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if (
    isUserExist.password &&
    !User.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token and refresh token

  // const accessToken = jwt.sign({
  //   id:isUserExist?.id,
  //   role:isUserExist?.role
  // },config.jwt.jwt_access_secret as Secret,{expiresIn:config.jwt.jwt_access_secret_expires_in})

  // const refreshToken = jwt.sign({
  //   id:isUserExist?.id,
  //   role:isUserExist?.role
  // },config.jwt.jwt_refresh_secret as Secret,{expiresIn:config.jwt.jwt_refresh_secret_expires_in})
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_access_secret_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      role,
    },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_secret_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
    // verifiedToken = jwt.verify(token, config.jwt.jwt_refresh_secret);
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  // check deleted users refresh token
  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not Exists!');
  }

  // Generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_access_secret_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  loginUser,
  refreshToken,
};
