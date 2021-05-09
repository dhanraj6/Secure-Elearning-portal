import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart } from "./helper/cartHelper";
import {removeItemFromCart} from "./helper/cartHelper"

 
const Card = ({ product,courseInfo=true, addtoCart = true, removeFromCart = false, setReload= f =>f , reload=undefined }) => {
  const [redirect, setRedirect] = useState(false);
  const [infoRedirect, setinfoRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

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
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Know More
        </button>
      )
    );
  };


  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
             removeItemFromCart(product._id)
             setReload(!reload)
            }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        {redirectInfo(infoRedirect)}
         <ImageHelper product={product} />
        <p className="card-header lead">
          {cartDescrption}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showCourseInfo(courseInfo)}</div>
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
