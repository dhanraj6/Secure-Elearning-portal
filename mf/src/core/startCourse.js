import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct } from "../admin/helper/adminapicall";
import "./style.css"

export default function CourseMain({match}) {

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


  return (
    <Base title="" description="">
      <div className="text-center">
        <h3>Main course Page</h3>
        <hr></hr>
        <h4>You are subcribed to course:<br></br> {name}</h4>
        <hr></hr>
        <h4>Your Video goes in here</h4>
        <hr></hr>
        <h4>Course Description:<br></br>{description}</h4>
        <hr></hr>
        <h4>Course Notes here</h4>
      </div>
    </Base>
  );
}
