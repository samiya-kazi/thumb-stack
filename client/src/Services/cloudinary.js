
const BASE_URL = 'https://api.cloudinary.com/v1_1/dmpn6t2jn/image/upload'

export function cldUpload (event, user) {
  
  
  const file = event.target.files[0];
  const formData = new FormData();
  const [file_name, file_type] = file.name.split('.');
  const public_id = user._id + '_' + Date.now() + '_' + file_name;
  
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