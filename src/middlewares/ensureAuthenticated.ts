/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    reponse: Response,
    next: NextFunction,
): void {
    // validacao do token jwt
    const authHeader = request.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new Error('Invalid JWT token');
    }
}
