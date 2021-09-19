import { loadResterConfig } from '@rester/core';
import fetch from 'cross-fetch';
import { environment } from '../../environments/environment';
import { SurfInsertParams, SurfUpdateParams } from './surf.model';

describe('Surf View Test', () => {
  const {
    addresses: {
      0: { protocol, host, port },
    },
  } = loadResterConfig(environment.config);
  const url = `${protocol}://${host}:${port}/surfs`;
  const variables = {
    existID: '',
    notExistID: '000000000000000000000001',
  };

  it('should return 201 when POST surf', async () => {
    const surf: SurfInsertParams = { content: 'Hello, world!' };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(surf),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(201);
    const result = await response.json();
    expect(result['_id']).toBeDefined();
    variables.existID = result['_id'];
  });

  it('should return 404 when GET not exist surf', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`);
    expect(response.status).toEqual(404);
  });

  it('should return 200 when GET exist surf', async () => {
    const response = await fetch(`${url}/${variables.existID}`);
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['_id']).toBeDefined();
    expect(result['_id']).toEqual(variables.existID);
  });

  it('should return 200 & list', async () => {
    const response = await fetch(url);
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result).toBeDefined();
    expect(result['list']).toBeDefined();
    expect(result['list'] instanceof Array).toBeTruthy();
  });

  it('should return 404 when PUT not exist surf', async () => {
    const surf: SurfUpdateParams = {
      author: 'new author',
      content: 'new content',
    };
    const response = await fetch(`${url}/${variables.notExistID}`, {
      method: 'PUT',
      body: JSON.stringify(surf),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(404);
  });

  it('should return 200 when PUT exist surf', async () => {
    const surf: SurfUpdateParams = {
      author: 'new author',
      content: 'new content',
    };
    const response = await fetch(`${url}/${variables.existID}`, {
      method: 'PUT',
      body: JSON.stringify(surf),
      headers: {
        'content-type': 'application/json',
      },
    });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result['_id']).toEqual(variables.existID);
    expect(result['author']).toEqual(surf.author);
    expect(result['content']).toEqual(surf.content);
  });

  it('should return 200 when DELETE not exist surf', async () => {
    const response = await fetch(`${url}/${variables.notExistID}`, {
      method: 'DELETE',
    });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result instanceof Array).toBeTruthy();
    expect(result[0]).toEqual(variables.notExistID);
  });

  it('should return 200 when DELETE exist surf', async () => {
    const response = await fetch(`${url}/${variables.existID}`, {
      method: 'DELETE',
    });
    expect(response.status).toEqual(200);
    const result = await response.json();
    expect(result instanceof Array).toBeTruthy();
    expect(result[0]).toEqual(variables.existID);
  });
});
