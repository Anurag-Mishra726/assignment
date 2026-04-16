import jwt from 'jsonwebtoken';

export const signJwt = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
export const verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);
