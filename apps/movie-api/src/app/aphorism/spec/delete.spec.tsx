import fetch from 'cross-fetch';
import { PrismaClient } from '../../helpers/database';

describe('Test [DELETE /aphorisms/:id]', () => {

  const id = 999;
  const database = new PrismaClient();

  beforeEach(async () => {
    await database.aphorism.deleteMany({});
    await database.aphorism.create({ data: { id, content: 'test' } });
  });

  const url = 'http://localhost:8080/aphorisms';

  it('[DELETE /aphorisms/999]\n\tshould delete 1 aphorism', async () => {
    const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toMatchObject({ id: 999, content: 'test', published: false });
  });

  it('[DELETE /aphorisms/888]\n\tshould return 404 not found', async () => {
    const response = await fetch(`${url}/888`, { method: 'DELETE' });
    expect(response.status).toEqual(404);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toContain('Aphorism "#888" not found');
  });

  it('[DELETE /aphorisms/what]\n\tshould return 400 bad request', async () => {
    const response = await fetch(`${url}/what`, { method: 'DELETE' });
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/u);
    expect(await response.json()).toContain('Aphorism "id" must be an integer > 0');
  });

});
