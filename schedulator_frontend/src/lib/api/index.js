import axios from 'axios';

const API = axios.create({
  validateStatus: () => true,
});

API.defaults.headers.post['Content-Type'] = 'application/json';
if (localStorage.getItem('token') !== null)
  API.defaults.headers.common['Authorization'] = `Token ${ localStorage.getItem('token') }`;


export function setToken(token) {
  localStorage.setItem('token', token);
  API.defaults.headers.common['Authorization'] = `Token ${ token }`;
}

export function removeToken() {
  localStorage.removeItem('token');
  delete API.defaults.headers.common['Authorization'];
}

export default API;
export * from './convert';
