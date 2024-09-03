const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getLocalStorageData = (key: string) => {
  const storedData = localStorage.getItem(key);
  const storedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (storedData && storedTimestamp) {
    const timestamp = parseInt(storedTimestamp, 10);
    const now = Date.now();

    if (now - timestamp < ONE_DAY_IN_MS) {
      return JSON.parse(storedData);
    }
  }
  return null;
};

export const setLocalStorageData = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_timestamp`, Date.now().toString());
};
