import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { isAutheticated } from "../auth/helper/index";
const { TextArea } = Input;

function SingleComment(props) {
    const userId = isAutheticated() && isAutheticated().user._id;
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: userId,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        axios.post('http://localhost:8000/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <div>
                <ul>
                    <li className="list-group-item list-group-item-dark" style={{ display: "flex" ,width:"80%"}}>
                        <span className="white badge badge-info font-weight-bold p-2 pl-5 pr-5" style={{ flexGrow: "2" }}>{props.comment.writer.name} : </span>

                        <span className="mr-4 ml-4" style={{ flexGrow: "12" ,textAlign:"start"}}>{props.comment.content}</span>

                        <span className="badge badge-secondary mr-2" style={{cursor:"pointer", flexGrow: "2" }}>{actions}</span>
                    </li>
                </ul>
            </div>

            {OpenReply &&
                < form className="form-inline" onSubmit={onSubmit}>
                    <div class="form-group mx-sm-3 mb-2">
                        <input class="form-control ml-4" placeholder={`Reply to ${props.comment.writer.name}`} value={CommentValue} onChange={handleChange} />
                    </div>
                    <button type="submit" onClick={onSubmit} class="btn btn-primary mb-2">Submit</button>
                </form>
            }

        </div>
    )
}

export default SingleComment