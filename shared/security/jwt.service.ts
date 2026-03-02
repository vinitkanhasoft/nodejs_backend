import { SignJWT, jwtVerify } from 'jose';
import { env } from '../../config/env';

export class JwtService {
  async sign(payload: Record<string, unknown>, expiresIn: string | number = '1h') {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(new TextEncoder().encode(env.jwtSecret));
  }

  async verify(token: string) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(env.jwtSecret));
    return payload;
  }
}