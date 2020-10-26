import axios from 'axios';

const commonApi = axios.create({
  baseURL: 'https://vue-coach-956f1.firebaseio.com',
  headers: { 'Content-Type': 'application/json' }
})

export default commonApi;