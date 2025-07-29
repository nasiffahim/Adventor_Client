import axios from 'axios';

const useAxios = axios.create({
  baseURL: 'https://tourism-management-system-server-dusky.vercel.app',
});

export default useAxios;
