import React, { useState} from "react";

 
const Ordercard = ({order}) => {
    
  
  const [count, setCount] = useState(order.count);

  const orderId = order ? order.transaction_id: "failed to get id";
  const orderAmount = order ? order.amount : "failed to get amount";
  const buyerName = order ? order.user.name : "failed to get student name";
  

return (
  <div className="card text-white bg-dark border border-info ">
  <div className="card-header font-weight-normal ">Student name: {buyerName}</div>
  <div className="card-body">
    <p className="lead bg-success font-weight-normal text-wrap">
     TransactionId: {orderId}
    </p>
    <p className="btn btn-success rounded  btn-sm px-4"> Price ${orderAmount}</p>
  </div>
  <br/>
  <br/>
</div>
  );
};

export default Ordercard;
