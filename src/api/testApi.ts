import axios from 'axios';

const testApi = axios.create({
  baseURL: 'https://api.skilla.ru',
  headers: {
    Authorization: 'Bearer testtoken',
  },
});

export default testApi;