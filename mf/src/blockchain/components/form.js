import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import b1 from "../b3.jpg";
import { isAutheticated } from "../../auth/helper/index"
import { getProduct } from "../../admin/helper/adminapicall";
class Forms extends Component {
  canBeSubmitted() {
    const { fname, lname, course, email } = this.state;
    return (
      fname.length > 0 &&
      course.length > 0 &&
      email.length > 0
    );
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addcertificate = event => {
    event.preventDefault();
    this.props.addcertificate(this.state);
    //console.log(this);
  };

  state = {
    fname: isAutheticated().user.name,
    email: isAutheticated().user.email,
    course: "",
  };

  componentDidMount() {
    console.log('mounted')
    this.loadCourseData(this.props.match.params.productId);
  }


  async loadCourseData(productId) {
    //added line 30
    await getProduct(productId).then((data) => {
      this.setState({
        course:data.name
      });

    });
  }



  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <div
        className="container-fluid "
      // style={{
      //   height: "100vh%",
      //   //backgroundImage: `url(${b1})`,
      //   background: `url(${b1}) no-repeat `,
      //   backgroundSize: "cover"
      // }}
      >
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "60px",
            color: "#66ffe7"
          }}
          className="mb-5 pt-3"
        >
          Your certificate on Blockchain
        </h1>
        <div
          style={{ marginBottom: "117px", background: "rgba(255,255,255,0.5)" }}
          className="w-50 container pt-3 pb-3 mx-auto"
        >
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat"
            }}
            className="mb-2"
          >
            Certificate details
          </h2>
          {/* <button onClick={this.addcertificate}></button> */}
          <div className="w-50 container pt-3 pb-3 mx-auto">
          <ul className="list-group">
            <li className="list-group-item">Name: {this.state.fname}</li>
            <li className="list-group-item">Email: {this.state.email}</li>
            <li className="list-group-item">Course: {this.state.course}</li>
          </ul>
        </div>
          <Form onSubmit={this.addcertificate}>
            <Form.Group>
              <label
                type="text"
                name="fname"
                value={this.state.fname}
                onChange={this.handleChange}
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group>
              <label
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email@email.com"
              />
            </Form.Group>
            <Form.Group>
              <label
                type="text"
                name="course"
                value={this.state.course}
                onChange={this.handleChange}
                placeholder="Course name"
              />
            </Form.Group>
            <Button
              disabled={!isEnabled}
              className="mt-3"
              variant="primary"
              type="submit"
            >
              Add certificate
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Forms;
