import React, { useState } from "react";
import "./Update.css";

const UpdateForm = ({ onUpdate }) => {
  const [updatedInfo, setUpdatedInfo] = useState({
    email: "",
    cell_no: "",
    image_url: ""
  });

  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append(
        'upload_preset', 'z6wkc6hb'
    );
    data.append('cloud_name', '');
    fetch('https://api.cloudinary.com/v1_1/di5mauk60/image/upload', {
        method: 'post',
        body: data
    }).then((response) => response.json()).then((data) => {
        console.log({data})
        setUrl(data.secure_url);
        setUpdatedInfo((prev) => ({...prev, "image_url": data.secure_url}))
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedInfo);
  };

  const handleUpdate = () => {
    onUpdate(updatedInfo);
  }

  return (
    <div className="update-form">
      <h3 style={{textAlign:"center", fontFamily:"sans-serif", color:"darkgreen", fontSize:"30px"}}>Update Information</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Cell No  </label>
        <input
          type="number"
          name="cell_no"
          placeholder="Cell No"
          value={updatedInfo.cell_no}
          onChange={handleChange}
          className="update"
        /> <br /> <br />

        <label htmlFor="">Upload Image</label>
        <input type="file"
        onChange={(e) => setImage(e.target.files[0])} 
        className="upload-image"/>
        <br /> <br />
        <button onClick={uploadImage} type="button" className="upload-btn"> Upload </button>
       
        <button type="submit" onClick={handleUpdate} className="save-btn"> Save </button>
      </form>
    </div>
  );
};

export default UpdateForm;