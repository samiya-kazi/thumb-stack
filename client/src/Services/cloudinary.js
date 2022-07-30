
const BASE_URL = 'https://api.cloudinary.com/v1_1/dmpn6t2jn/image/upload'

export function cldUpload (file, userId) {

  const formData = new FormData();
  const file_name = file.name.split('.')[0];
  const public_id = userId + '_' + Date.now() + '_' + file_name;
  
  formData.append("file", file);
  formData.append("upload_preset", "rcqrwjbn");
  formData.append("public_id", public_id);
  
  return fetch(BASE_URL, {
    method: "POST",
    body: formData
  })
  .then((response) => response.json())
  .catch(err => console.log(err));
}


export function thumbnailUpload (file, userId) {

  const formData = new FormData();
  const public_id = userId + '_' + Date.now() + '_thumbnail';
  
  formData.append("file", file);
  formData.append("upload_preset", "qhk6boar");
  formData.append("public_id", public_id);
  
  return fetch(BASE_URL, {
    method: "POST",
    body: formData
  })
  .then((response) => response.json())
  .catch(err => console.log(err));
}