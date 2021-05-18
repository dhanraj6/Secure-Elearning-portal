import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import { getProduct} from "../admin/helper/adminapicall";
import "./style.css"
import abc from  "../assets/uploads/Python.mp4"
import Comments from "./Comments"; 
import axios from "axios";
import Lesson from "./Lessons/Lesson";
export default function CourseMain({match}) {


    const [CommentLists, setCommentLists] = useState([])

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

    const videoId = match.params.productId

    const videoVariable = {
        videoId: videoId
    }

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


        axios.post('http://localhost:8000/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    };


    useEffect(() => {
        preload(match.params.productId);
    }, []);

  console.log(resource)

  const updateComment =  (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
  }


  return (
    <Base title="" description="">
      <div className="text-center">
        <hr></hr>
        <h4 style={{fontWeight:"bold"}}>{name}</h4>
        <hr></hr>
        {/* <h4>resource : {resource}</h4> */}
        <h5>Video</h5>
        {/* <video style={{ width: '100%',height:"80vh" }} controls >
            <source src={abc} type="video/mp4" />
        </video>  */}
         <Lesson url={filePath} /> 
        <p style={{fontWeight:"bold",width:"80%",textAlign:"center",margin:"0 auto"}}> {description}</p>
        <Comments CommentLists={CommentLists} postId={match.params.productId}  refreshFunction={updateComment} />
        <hr></hr>    
      </div>
    </Base>
  );
}
