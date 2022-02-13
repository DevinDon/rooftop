import fetch from 'cross-fetch';
import { PrismaClient } from '../../helpers/database';

describe('Test [GET /aphorisms/:id]', () => {

  const id = 999;
  const database = new PrismaClient();

  beforeEach(async () => {
    await database.aphorism.deleteMany({});
    await database.aphorism.create({ data: { id, content: 'test' } });
  });

  const url = 'http://localhost:8080/aphorisms';

  it('[GET /aphorisms/999]\n\tshould get 1 aphorism', async () => {
    const response = await fetch(`${url}/${id}`, { method: 'GET' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toMatchObject({ id: 999, content: 'test', published: false });
  });

  it('[GET /aphorisms/888]\n\tshould return 404 not found', async () => {
    const response = await fetch(`${url}/888`, { method: 'GET' });
    expect(response.status).toEqual(404);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Aphorism "#888" not found');
  });

  it('[GET /aphorisms/what]\n\tshould return 400 bad request', async () => {
    const response = await fetch(`${url}/what`, { method: 'GET' });
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Aphorism "id" must be an integer > 0');
  });

});
