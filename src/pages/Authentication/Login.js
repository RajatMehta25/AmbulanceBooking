import React, { Component } from "react";
import axios from "../../axios";
import { Row, Col, Input, Button, Alert, Container, Label, FormGroup } from "reactstrap";

import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { checkLogin, apiError } from "../../store/actions";

// import images
// import logo from '../../assets/images/logo/logo.png';
import ambulance from "../../assets/images/logo/ambulance.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event, values) {
    // console.log(this.props.checkLogin);
    let requestData = {
      inputUserName: this.props.checkLogin(values, this.props.history).payload.user.username,
      inputUserPassword: this.props.checkLogin(values, this.props.history).payload.user.password,
    };
    // let inputUserName = this.props.checkLogin(values).payload.user.username;
    // let inputUserPassword = this.props.checkLogin(values).payload.user.password;
    // console.log(inputUserName);
    // console.log(this.props.checkLogin(values).payload.user.username);
    // console.log(this.props.checkLogin(values).payload.user.password);
    try {
      // let { data } = await axios.post("/admin/login", {
      //   email: requestData.inputUserName,
      //   password: requestData.inputUserPassword,
      // });
      // console.log(data);

      // Cookies.set("admin_access_token", data.data.token, {
      //   expires: 365,
      // });

      Cookies.set("admin_access_token", "abc", {
        expires: 365,
      });
      // Cookies.set("access", JSON.stringify(data.data.access), {
      //   expires: 365,
      // });
      // Cookies.set("isSuperAdmin", JSON.stringify(data.data.is_super_admin), {
      //   expires: 365,
      // });
      // Cookies.set("email", JSON.stringify(data.data.email), {
      //   expires: 365,
      // });
      Cookies.set("email", "rajat@gmail.com", {
        expires: 365,
      });
      this.props.history.push("/adminPanel/dashboard");
    } catch (error) {
      // alert("some error");
      toast.error(`Please Enter the correct Credentials`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      console.log(error);
    }
  }

  componentDidMount() {
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-body-bg");
  }

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/adminPanel/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link>
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/adminPanel/" className="logo">
                                {/* <img src={ambulance} height="50" alt="logo" /> */}
                                <img
                                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqokEHn4Ei01MHH6LTHqfsbV64jvUCjG5RqQ&s`}
                                  height="50"
                                  alt="logo"
                                />

                                {/*<div height="100">
                                  Grovtek
                                </div>*/}
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                            <p className="text-muted">Sign in to continue to Webapp.</p>
                          </div>

                          {/*{this.props.loginError && this.props.loginError ? (
                            <Alert color="danger">
                              {this.props.loginError}
                            </Alert>
                          ) : null}*/}

                          <div className="p-2 mt-5">
                            <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit}>
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Username</Label>
                                <AvField
                                  name="username"
                                  value={this.state.username}
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  validate={{ email: true, required: true }}
                                  placeholder="Enter username"
                                />
                              </FormGroup>

                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <AvField
                                  name="password"
                                  value={this.state.password}
                                  type="password"
                                  className="form-control"
                                  validate={{ required: true }}
                                  id="userpassword"
                                  placeholder="Enter password"
                                />
                              </FormGroup>

                              <div className="custom-control custom-checkbox">
                                <Input type="checkbox" className="custom-control-input" id="customControlInline" />
                                <Label className="custom-control-label" htmlFor="customControlInline">
                                  Remember me
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  // color="primary"
                                  style={{ backgroundColor: "#2765B3", color: "#fff" }}
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Log In
                                </Button>
                              </div>

                              <div className="mt-4 text-center">
                                <Link to="/adminPanel/forgot-password" className="text-muted">
                                  <i className="mdi mdi-lock mr-1"></i> Forgot your password?
                                </Link>
                              </div>
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            {/* <p>Don't have an account ? <Link to="/register" className="font-weight-medium text-primary"> Register </Link> </p> */}
                            <p>© 2022- {new Date().getFullYear()} RajatMehta.</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
                {/* <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));
