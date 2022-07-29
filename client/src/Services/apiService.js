
const BASE_URL = 'http://localhost:3001'

export function saveThumbnail (thumbnailElements, backgroundColor, userId) {
  const body = {
    userId,
    elements: thumbnailElements,
    background: backgroundColor
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  return fetch(`${BASE_URL}/thumbnail`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function getThumbnails (userId) {
  return fetch(`${BASE_URL}/thumbnail/${userId}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function updateThumbnail (id, thumbnailElements, backgroundColor) {
  const body = {
    userId: 'user123',
    elements: thumbnailElements,
    background: backgroundColor
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  return fetch(`${BASE_URL}/thumbnail?tid=${id}`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function getUserInfo () {
  return fetch(`${BASE_URL}/user`,{
     method: 'GET',
     credentials: 'include'
   })
   .then(response => response.json())
   .catch(err => console.error(err));
};


export function logout () {
  return fetch(`${BASE_URL}/logout`, {
     method: 'GET',
     credentials: 'include'
   })
   .then(response => response)
   .catch(err => console.error(err));
};


export function login (user) {
  const options = {
   method: 'POST',
   body: JSON.stringify(user),
   headers: {
     "Content-type": "application/json"
   },
   credentials: 'include'
 };

  return fetch(`${BASE_URL}/login`, options)
    .then(response => {
      if(response.ok)
        return response.json()
    })
    .catch(err => console.error(err));
};


export function register (registerInfo) {
  const user = {
    email: registerInfo.email,
    password: registerInfo.password,
    firstName: registerInfo.firstName,
    lastName: registerInfo.lastName,
  }

  const options = {
		method: 'POST',
    body: JSON.stringify(user),
		headers: {
      "Content-type": "application/json"
    },
    credentials: 'include'
	};

  return fetch(`${BASE_URL}/register`, options)
    .then(response => {
      if(response.ok)
        return response.json();
    })
    .catch(err => console.error(err));
};