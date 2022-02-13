import fetch from 'cross-fetch';
import { PrismaClient } from '../../helpers/database';

describe('Test [POST /aphorisms/:id]', () => {

  const database = new PrismaClient();

  beforeEach(async () => {
    await database.aphorism.deleteMany({});
  });

  const url = 'http://localhost:8080/aphorisms';

  it('[POST /aphorisms]\n\tshould create an aphorism', async () => {
    const response = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({ content: 'patch', published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(201);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toMatchObject({ content: 'patch', published: true });
    expect(await database.aphorism.count()).toEqual(1);
  });

  it('[POST /aphorisms]\n\tshould return 400 bad request because not provide required fields', async () => {
    const response = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({ published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ keyword: 'required', message: 'must have required property \'content\'' }),
      ]),
    );
    expect(await database.aphorism.count()).toEqual(0);
  });

});
