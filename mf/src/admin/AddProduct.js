import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createaProduct , AddaVideo} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";
import Dropzone from 'react-dropzone';
import axios from 'axios';


const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

  const [FilePath, setFilePath] = useState("")

  const preload = () => {
    getCategories().then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onDrop = ( files ) => {
    let formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    console.log(files)
    formData.append("file", files[0])
    console.log("preeeeeedone")
    
    //AddaVideo(formData, config)
    axios.post('http://localhost:8000/api/video/uploadfiles', formData, config)
        .then(response=> {
            if(response.data.success){
              
                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)

                //gerenate thumbnail with this filepath ! 
                
            } else {
                alert('failed to save the video in server')
            }
        })
  }

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post video</span>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {/*<Icon type="plus" style={{ fontSize: '3rem' }} />*/}

                        </div>
                    )}
                </Dropzone>

                {/* {thumbnail !== "" &&
                    <div>
                        <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                    </div>
                } */}
            </div>
      {/* <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            //onChange={handleChange("photo")}
            onChange={onDrop("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>  */}
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Course
      </button>
    </form>
  );

  return (
    <Base
      title="Add a course here!"
      description="Welcome to course creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Instructor Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
