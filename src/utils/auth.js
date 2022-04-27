export const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return getResponse(res)
  })
};

export const authorization = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return getResponse(res)
  })
}

export const validityToken = (token) => {
  return fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    } 
  })
  .then((res) => {
    return getResponse(res)
  })
}