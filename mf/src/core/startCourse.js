import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct} from "../admin/helper/adminapicall";
import "./style.css"
import abc from  "../assets/uploads/Python.mp4"


export default function CourseMain({match}) {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        filePath: "",
        resource:"",
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
        resource,
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
                    resource: data.resource,
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
        <h4>Enrolled course : {name}</h4>
        <hr></hr>
        <h4>Course Description : {description}</h4>
        <hr></hr>
        <h4>resource : {resource}</h4>
        <h4>Video</h4>
        <video style={{ width: '100%' }} controls >
            <source src={abc} type="video/mp4" />
        </video>
        <hr></hr>    
      </div>
    </Base>
  );
}
