import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import PCard from "./PCard";
import { getProducts } from "../core/helper/coreapicalls";
import "./style.css"
import { isAutheticated } from "../auth/helper/index";
import { getProduct, getPurchaseList } from "../admin/helper/adminapicall";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [pp, setPurchased] = useState([]);
  const [np, setNotpurchased] = useState([]);
  const [error, setError] = useState(false);
  const [productIdArray,setproductArray] = useState([]);
  const plist=[]
  const nlist=[]

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  

  const loadAllProduct = () => {

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
        }
    });

    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } 
      else {
        setProducts(data);       
      }
    });

  };

  const checkPurchase = () => {
    for(let i=0;i<products.length;i++)
    {
      console.log(productIdArray[i]._id)
      if(productIdArray[i] === products[i]._id ){
        plist.push(products[i]);
      }
      else{
        nlist.push(products[i]);
      }   
    }
    console.log(plist)
    console.log(nlist)
    setNotpurchased(nlist);
    setPurchased(plist);
  }

  useEffect(() => {
    checkPurchase();
    loadAllProduct();  
  }, []);

  return (
    <Base title="" description="">
      <div className="text-center">
        <h1 className="bg-dark text-white text-center">All Courses</h1>
        <div className=" layoutChanger">
          
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
          {/* {np.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <PCard product={product} />
              </div>
            );
          })} */}
        </div>
      </div>
    </Base>
  );
}
