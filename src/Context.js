const isLocal = false;

const Context = isLocal
  ? "http://127.0.0.1:8000"
  : "https://groomer.onrender.com";

export default Context;
