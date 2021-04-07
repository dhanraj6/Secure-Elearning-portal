import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAutheticated();

  const userInfo = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Profile Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Student Dashboard"
      description=""
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-9">{userInfo()}</div>
      </div>
    </Base>
  );
};


export default UserDashBoard;
