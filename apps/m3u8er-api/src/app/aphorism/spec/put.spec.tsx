import fetch from 'cross-fetch';
import { PrismaClient } from '../../helpers/database';

describe('Test [PUT /aphorisms/:id]', () => {

  const id = 999;
  const database = new PrismaClient();

  beforeEach(async () => {
    await database.aphorism.deleteMany({});
    await database.aphorism.create({ data: { id, content: 'test', published: false, createdAt: new Date('2000-1-1') } });
  });

  const url = 'http://localhost:8080/aphorisms';

  it('[PUT /aphorisms/999]\n\tshould update [content] & [published] of aphorism', async () => {
    const response = await fetch(
      `${url}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: 'patch', published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toMatchObject({ id, content: 'patch', published: true });
  });

  it('[PUT /aphorisms/999]\n\tshould NOT update [id] & [createdAt] of aphorism', async () => {
    const response = await fetch(
      `${url}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ id: 987, createdAt: new Date('1970-1-1'), content: 'patch', published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toMatchObject({ id, createdAt: new Date('2000-1-1').toISOString() });
  });

  it('[PUT /aphorisms/888]\n\tshould return 400 bad request because not provide full fields', async () => {
    const response = await fetch(
      `${url}/888`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: 'patch' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ keyword: 'required', message: 'must have required property \'published\'' }),
      ]),
    );
  });

  it('[PUT /aphorisms/888]\n\tshould return 404 not found', async () => {
    const response = await fetch(
      `${url}/888`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: 'patch', published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(404);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Aphorism "#888" not found');
  });

  it('[PUT /aphorisms/-1]\n\tshould return 400 bad request', async () => {
    const response = await fetch(
      `${url}/-1`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: 'patch', published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Aphorism "id" must be an integer > 0');
  });

  it('[PUT /aphorisms/what]\n\tshould return 400 bad request', async () => {
    const response = await fetch(
      `${url}/what`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: 'patch', published: true }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Aphorism "id" must be an integer > 0');
  });

});
