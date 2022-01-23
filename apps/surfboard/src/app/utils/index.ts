export const encodeSafeBase64 = (link: string) => btoa(encodeURI(link))
  .replace(/\//g, '_')
  .replace(/\+/g, '-');

export const decodeSafeBase64 = (base64: string) => decodeURI(
  atob(base64.replace(/-/g, '+').replace(/_/g, '/')),
);
