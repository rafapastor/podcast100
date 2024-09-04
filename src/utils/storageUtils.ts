export const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setLocalStorageData = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const isDataExpired = (timestampKey: string, expirationTime: number) => {
  const timestamp = localStorage.getItem(timestampKey);
  return !timestamp || Date.now() - parseInt(timestamp) > expirationTime;
};
