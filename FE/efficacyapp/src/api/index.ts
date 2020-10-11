import axios from 'axios';

const URL = 'http://192.168.1.9:3000/api';

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  return data;
}

// TEST
export async function apiTest() {
  const uri = URL;
  const res = await axios
    .get(uri)
    .then((res) => res)
    .catch((err) => err);
  return res;
}

// LOGIN
export async function apiLogin(payload: any) {
  const uri = `${URL}/auth/signin`;
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// LOGOUT
export async function apiRegister(payload: any) {
  const uri = `${URL}/auth/signup`;
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// CONCERT - GET ALL
export async function apiGetAllConcert(token: string) {
  const uri = `${URL}/concerts/`;
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer: ${token}`,
    },
  });
  return handleResponse(res);
}

// CONCERT - POST
export async function apiPostConcert(payload: any, token: string) {
  const uri = `${URL}/concerts/`;
  const res = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer: ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
