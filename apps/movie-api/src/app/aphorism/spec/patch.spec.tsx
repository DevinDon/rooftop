import fetch from 'cross-fetch';
import { PrismaClient } from '../../helpers/database';

describe('Test [PATCH /aphorisms/:id]', () => {

  const id = 999;
  const database = new PrismaClient();

  beforeEach(async () => {
    await database.aphorism.deleteMany({});
    await database.aphorism.create({ data: { id, content: 'test', published: false, createdAt: new Date('2000-1-1') } });
  });

  const url = 'http://localhost:8080/aphorisms';

  it('[PATCH /aphorisms/999]\n\tshould update [content] of aphorism', async () => {
    const response = await fetch(
      `${url}/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ content: 'patch' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toMatchObject({ id, content: 'patch' });
  });

  it('[PATCH /aphorisms/999]\n\tshould update [published] of aphorism', async () => {
    const response = await fetch(
      `${url}/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toMatchObject({ id, published: true });
  });

  it('[PATCH /aphorisms/999]\n\tshould NOT update [id] & [createdAt] of aphorism', async () => {
    const response = await fetch(
      `${url}/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id: 987, createdAt: new Date('1970-1-1') }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toMatchObject({ id, createdAt: new Date('2000-1-1').toISOString() });
  });

  it('[PATCH /aphorisms/888]\n\tshould return 404 not found', async () => {
    const response = await fetch(
      `${url}/888`,
      {
        method: 'PATCH',
        body: JSON.stringify({ content: 'patch' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(404);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toContain('Aphorism "#888" not found');
  });

  it('[PATCH /aphorisms/-1]\n\tshould return 400 bad request', async () => {
    const response = await fetch(
      `${url}/-1`,
      {
        method: 'PATCH',
        body: JSON.stringify({ content: 'patch' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toContain('Aphorism "id" must be an integer > 0');
  });

  it('[PATCH /aphorisms/what]\n\tshould return 400 bad request', async () => {
    const response = await fetch(
      `${url}/what`,
      {
        method: 'PATCH',
        body: JSON.stringify({ content: 'patch' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toContain('Aphorism "id" must be an integer > 0');
  });

});
