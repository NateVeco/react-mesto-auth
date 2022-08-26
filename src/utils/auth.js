export const url = "https://auth.nomoreparties.co";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка`);
    }
};

export const register = ({ email, password }) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }).then((res) => getResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }).then((res) => getResponse(res))
};

export function getInfo() {
  const token = localStorage.getItem('jwt');
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    }
  }).then((res) => getResponse(res));
};
