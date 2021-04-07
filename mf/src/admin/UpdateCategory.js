import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, updateCategory} from "./helper/adminapicall";
import { isAutheticated} from "../auth/helper";

const UpdateCategory = () => {
  const { user, token } = isAutheticated();

  const [categories, setCategories] = useState([]);
   
  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  //TODO

  const onSubmit = (event) => {
    event.preventDefault();

    //updateCategory(categoryId, user._id, token, data).then(
    updateCategory('5fe79da1311d6e04f09f64b1',user._id, token, 'summer').then(
      (data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            preload();
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const data = name === "photo" ? event.target.files[0] : event.target.value;
    setCategories(data);
  };



  const createProductForm = () => (
    <form>
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
      

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Update the category here"
      description="Welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
