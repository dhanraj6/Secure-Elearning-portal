import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { isAutheticated } from "../../auth/helper/index"
class Reg extends Component {
  sendmail = event => {
    event.preventDefault();
    window.location.href = `mailto:${this.state.email}`;
  };
  state = {
    email: isAutheticated().user.email,
  };
  render() {
    return (
      <div className="pt-3">
        <h3>Email the following details:</h3>
        <div className="w-50 container pt-3 pb-3 mx-auto">
          <ul className="list-group">
            <li className="list-group-item">Ethereum wallet Address</li>
            <li className="list-group-item">Institute name</li>
            <li className="list-group-item">Address</li>
            <li className="list-group-item">
              Institute Registration details (scanned copy){" "}
            </li>
          </ul>
          <Form onSubmit={this.sendmail}>
            <Button variant="primary" type="submit">
              Send mail
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Reg;
