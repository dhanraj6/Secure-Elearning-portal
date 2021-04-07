import React, { useState } from "react";
import "../styles.css";
import Base from "../core/Base";
import Ordercard from "../core/ordercard";
import { getAllOrders } from "../core/helper/orderHelper";
import { isAutheticated } from "../auth/helper";

export default function Orders() {
  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const loadAllOrders = () => {
    getAllOrders(userId, token).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data);
      }
    });
  };

const loadAllOrdering = (orders) => {
  return (
    <div>
      <h2>Enrolments from students</h2>
      {orders.map((order, index) => (
        <Ordercard
          key={index}
          order={order}
        />
      ))}
    </div>
  );
};

return (
  <Base title="All enrolments" description="">
    <div className="row text-center">
      {loadAllOrders()}
      <div className="col-6">{ orders.length > 0 ? (loadAllOrdering(orders)) : (<h3>No Enrolments</h3>)}</div>
    </div>
  </Base>
);
}