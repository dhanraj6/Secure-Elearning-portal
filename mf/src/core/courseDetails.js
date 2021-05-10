import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getProduct } from "../admin/helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper"
import ImageHelperById  from "./helper/ImageHelper"
import './style.css'

const CourseDetails = ({ match }) => {

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
        formData,
    } = values;

    const imageurl = `http://localhost:8000/api//product/photo/${match.params.productId}`

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
                    formData: new FormData(),
                });
            }
        });
    };


    const contentList = () => {
        return (
            <ol class="list-group list-group-numbered">
                <li class="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span class="badge bg-info p-3 rounded-pill">14 </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span class="badge bg-info p-3 rounded-pill">14</span>
                   
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span class="badge bg-info p-3 rounded-pill">14</span>
                </li>
            </ol>
        )
    }

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    
    return (
        <Base title="" description="" fontColor="Yellow"
            className="bg-dark text-black p-4"
        >
            <div className="text-center layoutChanger">
                <div className="col">
                    <h1>{name}</h1>
                    <img src={imageurl} alt="photo" style={{ maxHeight: "100%", maxWidth: "50%" }} className="mb-3 rounded" />
                    <div className="containerStyle">
                        {`${description.substring(0, 2000)}...`}
                    </div>
                </div>
                <div className="container ">
                    {contentList()}
                </div>
            </div>
        </Base>
    )
}


export default CourseDetails;
