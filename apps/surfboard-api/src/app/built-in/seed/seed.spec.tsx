import fetch from 'cross-fetch';

describe('Test [POST /seed]', () => {

  const url = 'http://localhost:8080/seed';

  it('[POST /seed]\n\tshould generate 1 aphorism', async () => {
    const response = await fetch(url, { method: 'POST' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toEqual({ count: 1 });
  });

  it('[POST /seed?count=3]\n\tshould generate 3 aphorisms', async () => {
    const response = await fetch(`${url}?count=3`, { method: 'POST' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toEqual({ count: 3 });
  });

  it('[POST /seed?count=0]\n\tshould return 400 bad request', async () => {
    const response = await fetch(`${url}?count=0`, { method: 'POST' });
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Seed "count" must be an integer > 0');
  });

  it('[POST /seed?count=-1]\n\tshould return 400 bad request', async () => {
    const response = await fetch(`${url}?count=-1`, { method: 'POST' });
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Seed "count" must be an integer > 0');
  });

  it('[POST /seed?count=what]\n\tshould return 400 bad request', async () => {
    const response = await fetch(`${url}?count=what`, { method: 'POST' });
    expect(response.status).toEqual(400);
    expect(response.headers.get('content-type')).toMatch(/application\/json/);
    expect(await response.json()).toContain('Seed "count" must be an integer > 0');
  });

});
