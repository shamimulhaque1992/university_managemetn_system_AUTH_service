import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifiedToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifiedToken,
};
