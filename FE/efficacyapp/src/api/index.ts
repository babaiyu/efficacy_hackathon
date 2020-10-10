import axios from 'axios';

const URL = 'http://localhost:3000/api';

// Login
export async function apiTest() {
  const uri = 'https://jsonplaceholder.typicode.com/users';
  const res = await axios
    .get(uri)
    .then((res) => res.data)
    .catch((err) => err);
  return res;
}
