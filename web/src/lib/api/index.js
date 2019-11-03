import axios from 'axios';

const API = axios.create({
  validateStatus: () => true
});

API.defaults.headers.post['Content-Type'] = "application/json";
if (localStorage.getItem('token') !== null)
  API.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;

export default API;
