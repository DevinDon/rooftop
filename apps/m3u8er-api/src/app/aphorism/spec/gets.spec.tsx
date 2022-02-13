import fetch from 'cross-fetch';
import { PrismaClient } from '../../helpers/database';

describe('Test [GET /aphorisms/:id]', () => {

  const url = 'http://localhost:8080/aphorisms';
  const database = new PrismaClient();

  it('[GET /aphorisms]\n\tshould get 3 aphorisms', async () => {
    await database.aphorism.deleteMany({});
    await database.aphorism.createMany({
      data: [
        { id: 1, content: 'test' },
        { id: 2, content: 'test' },
        { id: 3, content: 'test' },
      ],
    });
    const response = await fetch(url, { method: 'GET' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    const json = await response.json();
    expect(json.length).toEqual(3);
    expect(json).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({ id: 1, content: 'test' }),
          expect.objectContaining({ id: 2, content: 'test' }),
          expect.objectContaining({ id: 3, content: 'test' }),
        ],
      ),
    );
  });

  it('[GET /aphorisms]\n\tshould return 200 & empty array', async () => {
    await database.aphorism.deleteMany({});
    const response = await fetch(url, { method: 'GET' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    const json = await response.json();
    expect(json.length).toEqual(0);
  });

  it('[GET /aphorisms]\n\tshould return 400 bad request', async () => {
    await database.aphorism.deleteMany({});
    await database.aphorism.createMany({
      data: [
        { id: 1, content: 'test' },
        { id: 2, content: 'test' },
        { id: 3, content: 'test' },
      ],
    });
    const response = await fetch(`${url}?count=bad`, { method: 'GET' });
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Aphorism "count" must be an integer > 0');
  });

});
