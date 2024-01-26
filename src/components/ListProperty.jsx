import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { createListings } from "../services/operations/propertyAPI";

const ListProperty = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);
  const photosInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  }

  const handlePhotosClick = () => {
    photosInputRef.current.click();
  }

  const [formData, setFormData] = useState({
    propertyType: "",
    bhk: 0,
    size: 0,
    bathrooms: 0,
    price: 0,
    pricePer: "",
    description: "",
    city: "",
    state: "",
    pincode: 0,
    address: "",
    thumbnail: null,
    photos: [],
  });

  const [propertyTypeSelected, setPropertyTypeSelected] = useState(false);

  const handlePropertyTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      propertyType: value,
    }));
    setPropertyTypeSelected(!!value);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
    toast.success("Thumbnail Uploaded");
  };
  
  const handlePhotosChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files,
    }));
    toast.success("Photos Uploaded");
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "photos") {
          for (let i = 0; i < formData[key].length; i++) {
            formDataToSend.append(key, formData[key][i]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    }

    createListings(token, formDataToSend);

    setFormData({
      propertyType: "",
      bhk: 0,
      size: 0,
      bathrooms: 0,
      price: 0,
      pricePer: "",
      description: "",
      city: "",
      state: "",
      pincode: 0,
      address: "",
      thumbnail: null,
      photos: [],
    });
  };

  return (
    <div className="create-listing-wrapper">
      <h1>Create Property Listing</h1>
      <form className="create-listing-data" onSubmit={handleSubmit}>
        <label>
          Property Type:
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handlePropertyTypeChange}
          >
            <option value="">Select Property Type</option>
            <option value="Flat">Flat</option>
            <option value="Bunglow">Bunglow</option>
            <option value="Villa">Villa</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Land">Land</option>
          </select>
        </label>

        {propertyTypeSelected && formData.propertyType !== "Land" && (
          <>
            <label>
              BHK:
              <input
                type="number"
                name="bhk"
                value={formData.bhk}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Bathrooms:
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}

        {propertyTypeSelected && (
          <>
            <label>
              Size:
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Per:
              <select
                name="pricePer"
                value={formData.pricePer}
                onChange={handleInputChange}
              >
                <option value="">Select Price Per</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </label>
            <label>
              Pincode:
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </label>

            <label>
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                ref={fileInputRef}
                value={formData.address}
                onChange={handleInputChange}
              />
            </label>
            <label className="custom-file-upload">
              Thumbnail:
              <button type="button" onClick={handleFileClick} className="profile-edit-button">Upload Thumbnail Image</button>
              <input type="file" ref={fileInputRef} id="inp" name="thumbnail" onChange={handleFileChange} />
              
            </label>
            <label className="custom-file-upload">
              Photos:
              <button type="button" onClick={handlePhotosClick} className="profile-edit-button">Upload Other Photos</button>
              <input
                type="file"
                id="inp"
                name="photos"
                ref={photosInputRef}
                multiple
                onChange={handlePhotosChange}
              />
              
            </label>
            <button className="profile-edit-button" type="submit">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ListProperty;
