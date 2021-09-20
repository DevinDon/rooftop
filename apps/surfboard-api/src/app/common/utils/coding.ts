export const encode = (url: string) =>
  Buffer.from(encodeURI(url), 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

export const decode = (encoded: string) =>
  decodeURI(
    Buffer.from(
      encoded.replace(/-/g, '+').replace(/_/g, '/'),
      'base64',
    ).toString('utf-8'),
  );
