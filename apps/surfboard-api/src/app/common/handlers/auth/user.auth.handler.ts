import {
  BaseHandler,
  HTTP403Exception,
  parseTokenFromRequest,
} from '@rester/core';

export class UserAuthHandler extends BaseHandler {
  async handle(next: () => Promise<unknown>): Promise<unknown> {
    if (this.request.method?.toUpperCase() === 'OPTIONS') {
      return next();
    }

    const token = parseTokenFromRequest(this.request);
    if (token !== 'admin') {
      throw new HTTP403Exception('No Permission.');
    }

    return next();
  }
}
