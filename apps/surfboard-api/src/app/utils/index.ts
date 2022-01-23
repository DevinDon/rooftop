export const encodeSafeBase64 = (link: string) => btoa(encodeURI(link))
  .replace(/\//g, '_')
  .replace(/\+/g, '-');

export const decodeSafeBase64 = (base64: string) => decodeURI(
  atob(base64.replace(/-/g, '+').replace(/_/g, '/')),
);

const URL_REG = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?)+(\.[a-z]{2,6}\/)?/;

export const isUrl = (url: string) => URL_REG.test(url);
