export const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data).data : null;
};

export const setLocalStorageData = (key: string, data: unknown) => {
  const item = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const isDataExpired = (key: string, expirationTime: number) => {
  const data = localStorage.getItem(key);
  const timestamp = data ? JSON.parse(data).timestamp : null;
  return !timestamp || Date.now() - parseInt(timestamp) > expirationTime;
};
