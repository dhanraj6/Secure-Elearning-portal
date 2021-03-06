import React , {useState}from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { isAutheticated } from "../auth/helper/index";
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

function Comments(props) {
    const userId = isAutheticated() && isAutheticated().user._id;
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = { 
            content: Comment,
            writer: userId,
            postId: props.postId   
         }

        axios.post('http://localhost:8000/api/comment/saveComment', variables)
        .then(response=> {
            if(response.data.success) {
                setComment("")
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    return (
        <div>
            <br />
            <hr></hr>
            <p style={{color:"yellow",fontWeight:"bold",textDecorationLine:"underline",cursor:"pointer" }}> Interact with the community</p>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' ,margin:"0 auto",justifyContent:"center"}} onSubmit={onSubmit} >
                <TextArea
                    style={{ width: '80%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Write a new comment"
                />
                <br />
                <button type="submit"  onClick={onSubmit}  class="btn btn-primary ml-2 mb-2">Submit</button> 
            </form>
        </div>
    )
}

export default Comments