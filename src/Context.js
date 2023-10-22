const isLocal = false;

const Context = isLocal
  ? "http://127.0.0.1:8000"
  : "https://groomer.onrender.com";

const SALON_TOKEN = "salon_token";

export const setToken = (token) => {
  sessionStorage.setItem(SALON_TOKEN, token);
};

export const removeToken = () => {
  sessionStorage.removeItem(SALON_TOKEN);
};

export const getToken = () => {
  let token = sessionStorage.getItem(SALON_TOKEN);
  return token;
};
export default Context;
