import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import web3 from "./web3.js";
import "./App.css";
import Navhead from "./components/navbar";
import Forms from "./components/form";
import Getcert from "./components/getcerti";
import Reg from "./components/registration";
import Intro from "./components/intro";
import certcontract from "./config.js";
import Certificate from "./components/certificate";
import {isAutheticated} from "../auth/helper/index"
// userId = isAutheticated() && isAutheticated().user._id;
// Uname = isAutheticated() && isAutheticated().user.name;
// const user: { name, email, role }
// } = isAutheticated();
  
class CertificateMain extends Component {
    
  state = {
    account: "",
    name: "",
    course: "",
    txh: "",
    id: "",
    output: [],
    tofound: false
  };
  componentDidMount() {
    console.log('mounted')
    // loadUserCourseData();
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    //added line 30
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    //console.log(certcontract);
    console.log(accounts);
    console.log("acc", accounts[0]);
    this.setState({ account: accounts[0] });
  }

  //myevent =()=> certcontract.added();
  //myevent=>watch((error,result)=>{
  //  console.log(result);
  //});

  add = data => {
    //const certificates = new this.state.web3.eth.Contract(abi, address);
    //console.log(data.fname, data.course, data.email);
    var name = data.fname;
    certcontract.methods.addcert(name, data.course, data.email).send(
      {
        from: this.state.account,
        gas: 500000
      },
      (error, result) => {
        if (error) console.log("error " + error);
        else {
          this.setState({ name: isAutheticated().user.name});
          this.setState({ course: data.course + " " + "course" });
         
          console.log(result);
          certcontract.methods
            .getid()
            .call({ from: this.state.account }, (error, result) => {
              this.setState({ id: result });
              if (!error) console.log(result);
              else console.log(error);
            });
            this.setState({ txh: result });
          //certcontract.events.added({}, (error, ev) => {
          //to use event below 2 lines
          //let key = Object.keys(ev[1].returnValues)[1];
          //console.log(ev[1].returnValues[key]);
          //});
        }
      }
    );
  };
  get = data => {
    //console.log(data.id);
    certcontract.methods
      .getcert(data.id)
      .call({ from: this.state.account }, (error, result) => {
        if (!error) {
          console.log(result);
          const v = Object.values(result);
          this.setState({ output: v });
          this.setState({ tofound: true });
          //this.history.pushState("certfound");
          console.log(this.state.output);
        } else alert("Certificate not found");
      });
  };
  render() {
    return (
      <div>
        <Router>
          <Navhead />
          
          <Route
            path="/certificate/:productId"
            exact
            render={(props) => <Forms addcertificate={this.add} {...props} />}
          />
          <Route
            path="/verify"
            render={() => (
              <Getcert
                getcertificate={this.get}
                yes={this.state.tofound}
                details={this.state.output}
              />
            )}
          />
          <Route
            path="/view"
            component={() => (
              <Certificate
                sname={this.state.name}
                course={this.state.course}
                txh={this.state.txh}
                id={this.state.id}
              />
            )}
          />
          <Route path="/intro" component={Intro} />
          <Route path="/reg" component={Reg} />
        </Router>
      </div>
    );
  }
}

export default CertificateMain;
