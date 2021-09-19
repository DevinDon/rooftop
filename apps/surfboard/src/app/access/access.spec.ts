import { loadResterConfig } from '@rester/core';
import fetch from 'cross-fetch';
import { environment } from '../../environments/environment';

describe('Accesses View Test', () => {

  const { addresses: { 0: { protocol, host, port } } } = loadResterConfig(environment.config);
  const url = `${protocol}://${host}:${port}/access`;

  it('should return 401 without token', async () => {
    const response = await fetch(url);
    expect(response.status).toEqual(401);
  });

  it('should return 403 with invalid token', async () => {
    const invalidToken = 'invalidtoken';
    const response = await fetch(url, { headers: { authorization: invalidToken } });
    expect(response.status).toEqual(401);
  });

  it('should return 200 & list with valid token', async () => {
    const validToken = 'Bearer admin';
    const response = await fetch(url, { headers: { authorization: validToken } });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['list']).toBeDefined();
    expect(result['list'] instanceof Array).toBeTruthy();
  });

});
