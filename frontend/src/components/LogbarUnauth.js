import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import logo from '../images/logo.png';
import '../style/Navbar.css';


var server_url;
if (process.env.NODE_ENV === "development")
  server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
  server_url = "https://hored.azurewebsites.net"


class LogbarUnauth extends Component { 
  constructor(props){
    super(props);
    this.firstNameRegistr = '';
    this.lastNameRegistr = '';
    this.emailRegistr = '';
    this.passwordRegistr = '';
    this.confirmPasswordRegistr = '';
    this.phoneRegistr = '';

    this.divFNameRegistr = React.createRef();
    this.divLNameRegistr = React.createRef();
    this.divPhoneRegistr = React.createRef();
    this.divEmailRegistr = React.createRef();
    this.divPassRegistr = React.createRef();
    this.divConfirmPassRegistr = React.createRef();
    this.btnSubmitRegistr = React.createRef();

    this.loginAuth = '';
    this.passwordAuth = '';
    this.btnSubmitAuth = React.createRef();

    this.validAll = false;
    this.validFirstName = false;
    this.validLastName = false;
    this.validPhone = false;
    this.validEmail = false;
    this.validPasword = false;
    this.validConfirmPassword = false;
  }

  handleSubmitAuth = event => {
    event.preventDefault();
    var userAuth = {
      email: this.loginAuth,
      password: this.passwordAuth
    }

    axios.post(server_url + '/api/Login', userAuth)
      .then(function (response) {
          window.location.reload();
          localStorage.setItem("currentUserId", (response.data.Id));
          localStorage.setItem("currentUserFirstName", (response.data.FirstName));
          localStorage.setItem("currentUserLastName", (response.data.LastName));
      });
  }

  handleSubmitRegistr = event => {
    event.preventDefault();
    var userRegister = {
      firstName: this.firstNameRegistr,
      lastName: this.lastNameRegistr,
      email: this.emailRegistr,
      password: this.passwordRegistr,
      phone: this.phoneRegistr
    };

    if (this.validAll) {
      localStorage.setItem("currentUserFirstName", (this.firstNameRegistr));
      localStorage.setItem("currentUserLastName", (this.lastNameRegistr));

      axios.post(server_url + '/api/Registration', userRegister)
        .then(function (response) {
          //handle success
          // window.location.reload();
          // console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  }

  checkPassword() {
    var password = this.passwordRegistr;
    var confirmPassword = this.confirmPasswordRegistr;
    if (password != confirmPassword) {
      console.log("Password isn't the same");
      this.validConfirmPassword = false;
      return false;
    }
    else {
      this.validConfirmPassword = true;
      return true;
    }
  }

  hideError(divName) {
    divName.current.textContent = '';
  }

  showError() {
    if (this.validFirstName && this.validLastName && this.validPhone && this.validEmail && this.validPasword && this.validConfirmPassword) {
      this.validAll = true;
    }
    else {
      this.validAll = false;

      if (this.validFirstName) {
        this.divFNameRegistr.current.textContent = '';
      }
      else {
        document.getElementById("firstName").style.borderColor = '#f74131';
        this.divFNameRegistr.current.textContent = 'Please enter a valid firstname';
      }
      if (this.validLastName) {
        this.divLNameRegistr.current.textContent = '';
      }
      else {
        document.getElementById("lastName").style.borderColor = '#f74131';
        this.divLNameRegistr.current.textContent = 'Please enter a valid lastname';
      }
      if (this.validPhone) {
        this.divPhoneRegistr.current.textContent = '';
      }
      else {
        document.getElementById("phone").style.borderColor = '#f74131';
        this.divPhoneRegistr.current.textContent = 'Please enter a valid phone number';
      }
      if (this.validEmail) {
        this.divEmailRegistr.current.textContent = '';
      }
      else {
        document.getElementById("email").style.borderColor = '#f74131';
        this.divEmailRegistr.current.textContent = "Please enter a valid email";
      }
      if (this.validPasword) {
        this.divPassRegistr.current.textContent = '';
      }
      else {
        document.getElementById("password").style.borderColor = '#f74131';
        this.divPassRegistr.current.textContent = "Please enter a valid password";
      }
      if (this.validConfirmPassword) {
        this.divConfirmPassRegistr.current.textContent = '';
      }
      else {
        document.getElementById("confirmPassword").style.borderColor = '#f74131';
        this.divConfirmPassRegistr.current.textContent = "Your passwords don't match";
      }
    }
  }

  validateFirstName() {
    if (validator.isAlpha(this.firstNameRegistr, 'en-GB')) {
      this.validFirstName = true;
      return true;
    } else {
      this.validFirstName = false;
      return false;
    }
  }

  validateLastName() {
    if (validator.isAlpha(this.lastNameRegistr, 'en-GB')) {
      this.validLastName = true;
      return true;
    } else {
      this.validLastName = false;
      return false;
    }
  }

  validatePhone() {
    if (validator.isMobilePhone(this.phoneRegistr, 'uk-UA')) {
      this.validPhone = true;
      return true;
    } else {
      this.validPhone = false;
      return false;
    }
  }

  validateEmail() {
    if (validator.isEmail(this.emailRegistr)) {
      this.validEmail = true;
      return true;
    } else {
      this.validEmail = false;
      return false;
    }
  }

  validatePassword() {
    if (validator.isEmpty(this.passwordRegistr) == false) {
      this.validPasword = true;
      return true;
    } else {
      this.validPasword = false;
      return false;
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark navbar-custom py-0 px-5">
          <div className="navbar-brand p-0">
            <a href="/">
              <img className="logo" src={logo}></img>
            </a>
            <span className="logo-name">Lviv Regional Hospital</span>
          </div>

          <ul className="nav">
            <li className="nav-item btn-custom">
              <a className="nav-link" data-toggle="modal" data-target="#SignInModal">Sign in</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" data-toggle="modal" data-target="#myModal">Sign up</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="navbar-toggler nav-link" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </a>  
            </li>           
          </ul>
                
        </nav>

        <div className="collapse pos-f-t container-fluid navbar-custom border border-top-2 p-0" id="navbarToggleExternalContent">
          <ul className="nav nav-justified">
            <li className="nav-item btn-custom">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">Contacts</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">Doctors</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">Illnes prevention</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">National medicine program</a>
            </li>
          </ul>
        </div>

        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header mb-2">
                <h4 className="modal-title">Registration Form</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <form className="ml-3 mr-3" onSubmit={this.handleSubmitRegistr} noValidate>    
                <div className="form-row ml-3">
                  <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0" id="inputFName">
                    <p className="labelForm">First Name</p>
                  </div>
                  <div className="form-group col-sm-8 col-xs-12" id="inputFName">

                    <input type="text" 
                        className="form-control"
                        onChange={(x => {this.firstNameRegistr=x.target.value; this.validateFirstName(); this.hideError(this.divFNameRegistr)})}  
                        id="firstName" 
                        placeholder="First Name" 
                        required/>
                    <div id="invalidFname" className="text-muted" ref={this.divFNameRegistr}>
                    </div>
                  </div>
                </div>
                <div className="form-row ml-3">

                <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0" id="inputFName">
                    <p className="labelForm">Last Name</p>
                  </div>
                  <div className="form-group col-sm-8 col-xs-12" id="inputLName">
                    <input type="text" 
                            className="form-control" 
                            onChange={(x => {this.lastNameRegistr=x.target.value; this.validateLastName(); this.hideError(this.divLNameRegistr)})} 
                            id="lastName" 
                            placeholder="Last Name"                           
                            required/>
                    <div id="invalidLname" className="text-muted" ref={this.divLNameRegistr}>
                    </div>
                  </div>
                </div>
                <div className="form-row ml-3">

                <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0" id="inputFName">
                    <p className="labelForm">Phone number</p>
                  </div>
                  <div className="form-group col-sm-8 col-xs-12" id="inputPhone">
                    <input type="tel"  
                            className="form-control" 
                            onChange={x=> {this.phoneRegistr=x.target.value; this.validatePhone();  this.hideError(this.divPhoneRegistr)}} 
                            id="phone" 
                            placeholder="Phone"                           
                            required/>
                    <div id="invalidPhone" className="text-muted" ref={this.divPhoneRegistr}>
                    </div>
                  </div>
                </div>
                <div className="form-row ml-3">
                <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0" id="inputFName">
                    <p className="labelForm">Email</p>
                  </div>
                  <div className="form-group col-sm-8 col-xs-12" id="inputEmail">
                    <input type="email"  
                            className="form-control" 
                            onChange={x=> {this.emailRegistr=x.target.value; this.validateEmail(); this.hideError(this.divEmailRegistr)}} 
                            id="inputEmailText" 
                            placeholder="Email" 
                            id="email" 
                            required/>
                    <div id="invalidEmail" className="text-muted" ref={this.divEmailRegistr}>
                    </div>
                  </div>
                </div>
                <div className="form-row ml-3">

                <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0" id="inputFName">
                    <p className="labelForm">Password</p>
                  </div>
                  <div className="form-group col-sm-8 col-xs-12" id="inputPassword">
                    <input type="password"  
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(x => {this.passwordRegistr=x.target.value; this.validatePassword(); this.hideError(this.divPassRegistr)})}
                            id="password" 
                            required/>
                    <div id="invalidPassword" className="text-muted" ref={this.divPassRegistr}>
                    </div>
                  </div>
                </div>
                <div className="form-row ml-3">
                <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0" id="inputFName">
                    <p className="labelForm">Confirm Password</p>
                  </div>
                  <div className="form-group col-sm-8 col-xs-12" id="inputConfirmPassword">
                    <input type="password"  
                            className="form-control" 
                            placeholder="Confirm Password" 
                            onChange={(x => {this.confirmPasswordRegistr=x.target.value; this.checkPassword(); this.hideError(this.divConfirmPassRegistr)})} 
                            onPaste={x => {x.preventDefault()}} 
                            id="confirmPassword" 
                            required/>
                    <div id="invalidConfirmPassword" className="text-muted" ref={this.divConfirmPassRegistr}>
                    </div>
                  </div>
                </div>
                <div className="row mb-3 mt-5 justify-content-center">
                  <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                    <button type="submit" ref={this.btnSubmitRegistr} onClick={(x=>this.showError())} className="btn btn-info btn-lg mb-3">Sign up
                    </button>
                  </div>
                  <div className="col-xs-3 col-sm-3 col-md-3 text-center" >   
                    <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="modal fade" id="SignInModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header mb-5">
                <h4 className="modal-title">Please, enter Your creds</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <form className="ml-3 mr-3" onSubmit={this.handleSubmitAuth}>
                <div className="form-row mb-3 justify-content-center">
                  <div className="form-group col-sm-6 col-xs-12">
                    <input className="form-control" type="text" placeholder="Email" onBlur={(x => { this.loginAuth = x.target.value; })} required />
                  </div>
                </div>
                <div className="form-row mb-3 justify-content-center">
                  <div className="form-group col-sm-6 col-xs-12">
                    <input className="form-control" type="password" placeholder="Password" onBlur={(x => { this.passwordAuth = x.target.value; })} required />
                  </div>
                </div>
                <div className="row mb-3 mt-5 justify-content-center">
                  <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                    <button type="submit" className="btn btn-info btn-lg mb-3">Sign in
                    </button>
                  </div>
                  <div className="col-xs-3 col-sm-3 col-md-3 text-center" >
                    <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default LogbarUnauth;