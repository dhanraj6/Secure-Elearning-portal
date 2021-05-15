import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getProduct, getPurchaseList } from "../admin/helper/adminapicall";
import './style.css'
import { isAutheticated } from "../auth/helper/index";
import SCard from "./SCard"


const MyEnrolments = ( ) => {

    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;
    const [products, setProducts] = useState([]);

    const [courseRedirect, setCourseRedirect] = useState(false);

   
    const preload = () => {
       
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
              setProducts(prod);
            }
      });
    };

    useEffect(() => {
        preload();
    }, []);

    return (
        <Base title="" description="">
      <div className="text-center">
        <h1 className="bg-dark text-white text-center">Enrolled Courses</h1>
        <div className=" layoutChanger">  
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <SCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
    )
}


export default MyEnrolments;


