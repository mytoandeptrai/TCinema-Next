// SET STORAGE
const setLanguage = (language: any) => {
  localStorage.setItem('language', JSON.stringify(language));
};

const setTokens = (tokens: {}) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

// GET FROM STORAGE
const getLanguage = () => JSON.parse(localStorage.getItem('language') || '{"":""}');

const getTokens = () => JSON.parse(localStorage.getItem('language') || '{"":""}');

// Remove items from storage
export const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

const setKeyIntoStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

const getItemFromStorage = (key: string, tempValue: string) => {
  try {
    const item = JSON.parse(localStorage.getItem(key) || tempValue);

    return item;
  } catch (error) {
    removeItemFromStorage(key);
    return tempValue;
  }
};

export { getLanguage, getTokens, setLanguage, setTokens, setKeyIntoStorage, getItemFromStorage };
