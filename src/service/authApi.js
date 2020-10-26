import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com',
  headers: { 'Content-Type': 'application/json' }
})

export default authApi;