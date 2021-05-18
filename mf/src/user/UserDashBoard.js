import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { getPurchaseList, getProducts } from "../admin/helper/adminapicall";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAutheticated();
  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;
  const [tproducts, setTProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState([]);


  const preload = () => {

    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      }
      else {
        setProducts(data);
      }
    });

    let prod = [];
    getPurchaseList(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        for (let i = 0; i < data.length; i++) {
          prod.push(data[i].products[0]._id);
        }
        setTProducts(prod);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const userInfo = () => {
    return (
      <div className="card">
        <h4 className="card-header" style={{ textAlign: "center", fontWeight: "bold" }}>Profile Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge  mr-3  p-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge mr-3  p-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge mr-3 p-2">Courses Enrolled:</span>
            <div>
              {products.map((product, index) => {
                if (tproducts.includes(product._id)) {
                  return (
                    <div key={index} className="mb-4" style={{ color: "black" ,fontWeight:"bold"}}>
                      <ol>{product.name}</ol>
                    </div>
                  );
                }
              })}
            </div>
          </li>
        </ul>
      </div>
    );
  };


  return (
    <Base
      title="Student Dashboard"
      description=""
      className="container p-4"
    >
      <div className="row">
        <div className="col-12">{userInfo()}</div>
      </div>
    </Base>
  );
};


export default UserDashBoard;
