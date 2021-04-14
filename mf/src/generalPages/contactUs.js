import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

const ContactUs = () => {
    return (
        <Base title="" description="">
            <div className="container">
                <h6 style={{ color: 'white' }}>
                    <div className="container">
                        <form id="contact-form">

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" aria-describedby="emailHelp" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea className="form-control" rows="5" />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{borderRadius:"15px"}}>Submit</button>

                        </form>
                    </div>
                </h6>
            </div>
        </Base>
    );
}

export default ContactUs;
