import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import aboutImage from '../assets/aboutImages.jpeg'

const About = () => {
    return (
        <Base title="" description="">
            <div className="container">
            <img class="img-fluid rounded mx-auto d-block" src={aboutImage} alt="E-Learning" />
                <h6 className="m-3" style={{ color: 'white' }} >
                Online learning is booming in current times.
                Aided by the widespread availability of high-speed internet, making use of new technologies
                such as 4G and the soon-to-be-released 5G,
                online learning is expected to grow by leaps and bounds in the foreseeable future.
                Less expensive than traditional teaching methods: As the cost of teaching is low,
                the expenses borne by the students inevitably come down. This makes education far more widespread and economical.
                <br></br> A vast variety of available courses: These days, online courses on everything are available at the touch of a button –
                from religion to commerce, philosophy to fashion designing, programming to painting, photography to yoga –
                there is hardly any field that hasn’t been touched by e-learning
                </h6>
            </div>
        </Base>
    );
}

export default About;
