import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { getProduct, getPurchaseList } from "../admin/helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper"
import ImageHelperById from "./helper/ImageHelper"
import './style.css'
import axios from 'axios';
import { API } from "../backend";
import { isAutheticated } from "../auth/helper/index";



const CourseDetails = ({ match }) => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        filePath: "",
        creator: "",
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
        creator,
    } = values;

    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;
    const [course, setCourses] = useState();
    const [productIdArray,setproductArray] = useState([]);

    const imageurl = `http://localhost:8000/api//product/photo/${match.params.productId}`
    const [courseRedirect, setCourseRedirect] = useState(false);

    var plist = []

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
                    creator: data.creator,
                    formData: new FormData(),
                });
            }
        });

        let prod =[];
        getPurchaseList(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                for(let i=0;i<data.length;i++)
                {
                    prod.push(data[i].products[0]._id);
                }
                setproductArray(prod);
                console.log(data)
            }
        });
    };


    const features = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Shareable Certificate</h5>
                                <p className="card-text">Earn a Certificate upon completion.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> 100% online</h5>
                                <p className="card-text">Start instantly and learn at your own schedule.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">English</h5>
                                <p className="card-text">ESubtitles: Hindi ,Arabic, French, Ukrainian,  </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> 100% genuine Certificate</h5>
                                <p className="card-text">Project completion you will get hashed certificate.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }

    const contentList = () => {
        return (
            <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span className="badge bg-info p-3 rounded-pill">14 </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span className="badge bg-info p-3 rounded-pill">14</span>

                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span className="badge bg-info p-3 rounded-pill">14</span>
                </li>
            </ol>
        )
    }

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    //console.log(filePath)

    const gotoCourse = () => {
        setCourseRedirect(true);
    }


    const redirectCourse = courseRedirect => {
        if (courseRedirect) {
            return <Redirect to={`/course/video/${match.params.productId}`} />
        }
    }

    // const checkSubscribed = (match.params.productId === course) ? true : false;

    /* var ii = String(match.params.productId)
    console.log(ii)
    const checkSubscribed = plist.includes((match.params.productId).toString());
    console.log(checkSubscribed); */

    console.log(productIdArray)

    const checkSubscribed = productIdArray.includes(match.params.productId);
    
    const startCourse = () => {
        return checkSubscribed && (
            (
                <button
                    onClick={gotoCourse}
                    className="btn btn-block btn-outline-info mt-2 mb-2"
                >
                    StartCourse
                </button>
            )
        );
    };


    // const getUserPurchaseList = (userId, token) => {

    //   };

    ///and check his purchases list
    //iterate the purchase list  contains data.products._id === match.params.productId


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
                    <div>
                        {redirectCourse(courseRedirect)}
                        {startCourse()}
                    </div>
                    {features()}
                    {contentList()}
                </div>
            </div>
            <hr></hr>
        </Base>
    )
}


export default CourseDetails;


