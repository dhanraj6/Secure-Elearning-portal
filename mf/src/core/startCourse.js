import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProduct } from "../admin/helper/adminapicall";
import "./style.css"
import abc from "../assets/uploads/Python.mp4"
//import useFileDownloader from "hooks/useFileDownloader"
// import Lesson from "./Lessons/Lesson";
import { isAutheticated } from "../auth/helper/index";
import ResponsivePlayer from './Lessons/VideoPlayer'
import { Redirect } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments"; 



export default function CourseMain({ match, showCertificate = true }) {
    const userId = isAutheticated() && isAutheticated().user._id;

    //Lesson parameter:
    const [watchComplete, setWatchComplete] = useState(false)
    const [certificateStatus, setCertificateStatus] = useState("Please watch the video to get certificate")
    const [styling, setStyling] = useState("markerNot")
    const [redirect, setRedirect] = useState(false);
    const [CommentLists, setCommentLists] = useState([])
    const [infoRedirect, setinfoRedirect] = useState(false);


    const handleWatchComplete = ({ played }) => {
        if (played >= 0.9 && !watchComplete) {
            setWatchComplete(true);
            setCertificateStatus("Course Completed Get Certificate")
            setStyling("markerIs")
        }
    }


    const gotoCetificate = () => {
        setRedirect(true);
    }



    const redirectCertificate = redirect => {
        if (redirect) {
            return <Redirect to={`/certificate/${match.params.productId}`} />;
        }
    };



    const showCertificateButton = showCertificate => {
        return (
            showCertificate &&
            <div>
                <button className={styling} onClick={gotoCetificate} >
                    {certificateStatus}
                </button>
            </div>
        );
    };

    const gotoInfo =()=>{
        setinfoRedirect(true);
      }
    
      const redirectInfo = infoRedirect =>{
        if(infoRedirect){
          return <Redirect to={`/assesment/${match.params.productId}`} />
        }
      }
    
      const showCourseInfo =()  => {
        return (
          true && (
            <button
              onClick={gotoInfo}
              className="btn btn-success btn-lg"
            >
             Start Assesment
            </button>
          )
        );
      };

    const [values, setValues] = useState({
        name: "",
        description: "",
        // creator: "",
        price: "",
        stock: "",
        photo: "",
        filePath: "",
        resource: "",
    })

    const {
        name,
        // creator,
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
                    // creator:data.creator,
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

    //const downloadFile = useFileDownloader();
    //const download = (resource) => downloadFile(resource);


    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const updateComment =  (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    console.log(resource)

    return (
        <Base title="" description="">
            <div className="text-center">
                {redirectCertificate(redirect)}
                {redirectInfo(infoRedirect)}
                <hr></hr>
                <h4> {name}</h4>
                <hr></hr>
                <hr></hr>
                {/* <h4>resource : {resource}</h4> */}
                <h4>Video</h4>
                {/* <video style={{ width: '100%' }} controls >
            <source src={abc} type="video/mp4" />
        </video> */}
                <ResponsivePlayer
                    url={abc}
                    onProgress={handleWatchComplete}
                />
                <div>
                    {!watchComplete &&
                        (<div>
                            <hr></hr>
                            <p>Please watch the video completely to get your certificate</p>
                        </div> )
                        }

                    {watchComplete && showCertificateButton(showCertificate)}
                </div>
                
                {/* <h1>{creator}</h1> */}
                {showCourseInfo()}
                <br></br>
                <br></br>
                <div style={{ textAlign: "center" }}>
                    <button className='btn btn-warning btn-lg' ><a href="http://www.africau.edu/images/default/sample.pdf" download text-decoration="none" target="../assets">Download Resources</a></button>
                </div>
                <Comments CommentLists={CommentLists} postId={match.params.productId}  refreshFunction={updateComment} />
                <hr></hr>
            </div>
        </Base>
    );
}
