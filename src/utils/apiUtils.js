// utils/apiUtils.js
import { API_Key } from './constants';

let currentKeyIndex = 0;

export const fetchWithKeyCycling = async (url) => {
  let response;
  let data;

  for (let i = 0; i < API_Key.length; i++) {
    const key = API_Key[currentKeyIndex];
    try {
      response = await fetch(`${url}&key=${key}`);
      data = await response.json();
      if (data.error && data.error.errors[0].reason === 'quotaExceeded') {
        console.error(`Quota exceeded for key: ${key}`);
        currentKeyIndex = (currentKeyIndex + 1) % API_Key.length;
        continue;
      }
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  throw new Error('All API keys have exceeded their quota or an error occurred.');
};
