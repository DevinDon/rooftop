import fetch from 'cross-fetch';

describe('Test [GET /ping]', () => {

  const url = 'http://localhost:8080/ping';

  it('[GET /ping]\n\tshould return 200 and "pong"', async () => {
    const response = await fetch(url, { method: 'GET' });
    expect(response.status).toEqual(200);
    expect(response.headers.get('content-type')).toMatch(/text\/plain/u);
    expect(await response.text()).toEqual('pong');
  });

});
