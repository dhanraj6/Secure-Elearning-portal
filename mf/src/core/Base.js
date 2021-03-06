import React from "react";
import Menu from "./Menu";
import { Link, withRouter } from "react-router-dom";
import './basestyle.css'

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  fontColor="white",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="text-white text-center">
        <h1 className={fontColor}>{title}</h1>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3 footerStyle">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <Link className="nav-link" to="/contactus"><button className="btn btn-warning btn-lg">Contact Us</button></Link>
      </div>
    </footer>
  </div>
);

export default Base;
