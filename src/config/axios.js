import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api/v1';

const BASE_URL = 'https://morning-tor-83426.herokuapp.com/api/v1';

const TOKEN =
  localStorage.getItem('persist:root') &&
  JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user)?.currentUser?.accessToken;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
