import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { getProduct } from "../admin/helper/adminapicall";
import "./style.css"
 
const SCard = ({ product,courseInfo=true, addtoCartRent=true, addtoCart = true, removeFromCart = false, setReload= f =>f , reload=undefined }) => {
  
  const [infoRedirect, setinfoRedirect] = useState(false);
  const [ sProduct, setsProduct] = useState(false);
  const [error, setError] = useState(false);

  const cartTitle = sProduct ? sProduct.name : "A photo from pexels";
  const cartDescrption = sProduct ? sProduct.description : "Default description";
  const cartbuyPrice = sProduct ? sProduct.buyPrice : "DEFAULT";
  const cartrentPrice = sProduct ? sProduct.rentPrice : "DEFAULT";

  const loadProduct = (product) => {

    console.log(product)

    getProduct(product).then(data => {
      if (data.error) {
        setError(data.error);
      } 
      else {
        setsProduct(data);     
        console.log(data)  
      }
    });

  };

  useEffect(() => {
    loadProduct(product);  
  }, []);

  const gotoInfo =()=>{
    setinfoRedirect(true);
  }


  const redirectInfo = infoRedirect =>{
    if(infoRedirect){
      return <Redirect to={`/product/${sProduct._id}`} />
    }
  }

  const showCourseInfo = courseInfo => {
    return (
      courseInfo && (
        <button
          onClick={gotoInfo}
          className="btn btn-block btn-outline-info mt-2 mb-2"
        >
          Know More
        </button>
      )
    );
  };


  return (
    <div className="card text-white bg-dark cardsStyle">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {redirectInfo(infoRedirect)}
         <ImageHelper product={sProduct} />
        <p className="card-header lead">
          {`${cartDescrption.substring(0, 200)}...`}
        </p>
        <div className="row">
          <div className="col-12">{showCourseInfo(courseInfo)}</div>
        </div>
      </div>
    </div>
  );
};

export default SCard;
