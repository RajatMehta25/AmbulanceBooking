import axios from "../axios";

export async function handleImageUpload(file) {
  const formData = new FormData();
  formData.append("file", file);
  console.log(file);
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    const { data } = await axios.post(
      "/upload/img",
      formData,
      config
    );
    console.log(data);


    
    return data.url;
    //{ location: data.result.file, };
  } catch (err) {
    return err;
  }
}