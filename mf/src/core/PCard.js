import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import "./style.css"
 
const Card = ({ product,courseInfo=true, addtoCart = true, removeFromCart = false, setReload= f =>f , reload=undefined }) => {
  const [infoRedirect, setinfoRedirect] = useState(false);
  
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const gotoInfo =()=>{
    setinfoRedirect(true);
  }

  const redirectInfo = infoRedirect =>{
    if(infoRedirect){
      return <Redirect to={`/product/${product._id}`} />
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
         <ImageHelper product={product} />
        <p className="card-header lead">
          {`${cartDescrption.substring(0, 200)}...`}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showCourseInfo(courseInfo)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
