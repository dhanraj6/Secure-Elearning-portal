import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { getProduct } from "../admin/helper/adminapicall";
import { isAutheticated } from "../auth/helper";
import ImageHelper from "../core/helper/ImageHelper"

const CourseDetails = ({ match }) => {

    const { user, token } = isAutheticated();


    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",

    })

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
        getRedirect,
        formData,
    } = values;


    const preload = (productId) => {
        getProduct(productId).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData(),
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    return (
        <Base
      title={name}
      description=""
      className="container bg-info p-4"
    >
     <p>{name}</p>
     <p>{description}</p>
     <ImageHelper product={match.productId} />
    </Base>
    )
}


export default CourseDetails;