import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  },[reload]); 

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load courses</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            addtoCartRent={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{ products.length > 0 ? (loadAllProducts(products)) : (<h3>No courses in cart</h3>)}</div>
        <div className="col-6"> <Paymentb products={products} setReload={setReload} reload={reload} /></div>
      </div>
    </Base>
  );
};

export default Cart;
