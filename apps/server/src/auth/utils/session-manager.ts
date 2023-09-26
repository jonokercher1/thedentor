import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export default class SessionManager {
  private readonly AUTH_TOKEN_NAME = 'authSession';

  public getSessionCookieFromRequest(request: Request): string {
    return request.cookies[this.AUTH_TOKEN_NAME];
  }

  public setSessionCookieInResponse(response: Response, accessToken: string): void {
    response.cookie(this.AUTH_TOKEN_NAME, accessToken, { httpOnly: true });
  }
}