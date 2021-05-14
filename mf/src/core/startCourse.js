import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct, getPurchaseList } from "../admin/helper/adminapicall";
import "./style.css"
import abc from  "../assets/uploads/Python.mp4"
import { isAutheticated } from "../auth/helper/index";

export default function CourseMain({match}) {

    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        filePath: "",
    })

    const {
        name,
        description,
        price,
        stock,
        categories,
        filePath,
        category,
        loading,
        formData,
    } = values;


    const preload = (productId) => {
        getProduct(productId).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    prodId: data._id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    filePath: data.filePath,
                    formData: new FormData(),
                });
            }
        });
    };


    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const getUserPurchaseList = (userId, token) => {
        getPurchaseList(userId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            preload();
            //something
          }
        }); 
      };

      console.log(getUserPurchaseList(userId))
   
    ///add the code to get user by id(there is function already written) according to loggedin user (done)
    //first create getuserbyid function in admin api call so that i can called in getUserPurchaseList
    ///and check his purchases list
    //iterate the purchase list and check whether present list contains any id === videoid

  return (
    <Base title="" description="">
      <div className="text-center">
        <h3>Main course Page</h3>
        <hr></hr>
        <h4>Enrolled course : {name}</h4>
        <hr></hr>
        <h4>Course Description : {description}</h4>
        <hr></hr>
        <h4>Video</h4>
        <video style={{ width: '100%' }} controls >
            <source src={abc} type="video/mp4" />
        </video>
        <hr></hr>
      </div>
    </Base>
  );
}
