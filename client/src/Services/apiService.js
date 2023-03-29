
export async function saveThumbnail (thumbnailElements, backgroundColor, userId, url) {
  const body = {
    userId,
    elements: thumbnailElements,
    background: backgroundColor,
    imageSrc: url,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail`, options);
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}


export async function getThumbnails (userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${userId}`);
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}


export async function updateThumbnail (id, thumbnailElements, backgroundColor, url) {
  const body = {
    elements: thumbnailElements,
    background: backgroundColor,
    imageSrc: url,
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?tid=${id}`, options);
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}




export async function deleteThumbnail (id) {
  const options = {
    method: 'DELETE',
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?tid=${id}`, options);
    return response.json();
  } catch (err) {
    return console.log(err);
  }
}





export async function getUserInfo () {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user`, {
      method: 'GET',
      credentials: 'include'
    });
    return response.json();
  } catch (err) {
    return console.error(err);
  }
};


export async function logout () {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    return response;
  } catch (err) {
    return console.error(err);
  }
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



  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, options)
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

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/register`, options)
    .then(response => {
      if(response.ok)
        return response.json();
    })
    .catch(err => console.error(err));
};