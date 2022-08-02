
export function saveThumbnail (thumbnailElements, backgroundColor, userId, imageSrc, version) {
  const body = {
    userId,
    elements: thumbnailElements,
    background: backgroundColor,
    imageSrc: process.env.REACT_APP_CLOUD_IMAGE_BASE_URL + '/v' + version + '/' + imageSrc + ".png",
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function getThumbnails (userId) {
  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail/${userId}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function updateThumbnail (id, thumbnailElements, backgroundColor, imageSrc, version) {
  const body = {
    elements: thumbnailElements,
    background: backgroundColor,
    imageSrc: process.env.REACT_APP_CLOUD_IMAGE_BASE_URL + '/v' + version + '/' + imageSrc + ".png",
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?tid=${id}`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}




export function deleteThumbnail (id) {
  const options = {
    method: 'DELETE',
  }

  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/thumbnail?tid=${id}`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}





export function getUserInfo () {
  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/user`,{
     method: 'GET',
     credentials: 'include'
   })
   .then(response => response.json())
   .catch(err => console.error(err));
};


export function logout () {
  return fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/logout`, {
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