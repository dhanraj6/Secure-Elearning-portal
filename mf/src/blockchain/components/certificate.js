import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../certstyle.css";
import printJs from "print-js";

class Certificate extends Component {
  state = {};
  onclickprint = event => {
    event.preventDefault();
    window.print();
    //printJs("printcertificate", "html");
  };
  render() {
    return (
      <div className="w-100 pc ">
        <div id="printcertificate" className="w-75 cert">
          <div id="fname">
            <h3>{this.props.sname}</h3>
          </div>
          <div id="course">
            <style>{`@media print {#course{color:red;}}`}</style>
            <span>{this.props.course} </span>
          </div>
          <div id="txh">
            <span>{this.props.txh}</span>
          </div>
          {/*
          <div id="id">
            <span>{this.props.id}</span>
          </div> */}
        </div>
        <Button
          className="btne"
          onClick={this.onclickprint}
          variant="success"
          type="submit"
        >
          Print
        </Button>
      </div>
    );
  }
}

export default Certificate;
