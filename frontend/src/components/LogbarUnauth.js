import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Authorization extends React.Component {
    constructor(props){
      super(props);
      this.loginAuth='';
      this.passwordAuth='';
    }
    
    handleSubmitAuth = event => 
    {
      event.preventDefault();
      //const
  
      var userAuth ={
        email: this.loginAuth,
        password: this.passwordAuth
      }
      
      axios.post(server_url + '/api/Login',userAuth)
        .then(function (response) {
            window.location.reload();
            localStorage.setItem("currentUserFirstName", (response.data.FirstName));
            localStorage.setItem("currentUserLastName", (response.data.LastName));
        })
    }
  
      render() {
        return(
          <div className='divRender'>
            <form className="navbarForm" onSubmit={this.handleSubmitAuth} noValidate >
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2 navbarDiv">
                    <input className="form-control col-12"  type="text" placeholder="Email" onBlur={(x => {this.loginAuth=x.target.value; })}/> 
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2">
                    <input className="form-control col-12"  type="password" placeholder="Password" onBlur={(x => {this.passwordAuth=x.target.value; })}/>           
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2">
                    <button type="submit"  ref={this.btnSubmit} className="btn btn-info col-xs-6">Sign in</button>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2">
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign up</button> 
                  </div>
                </div>
              </div>          
            </form>
          </div>
        );
      }
      
    }

class LogbarUnauth extends Component { 
      constructor(props){
        super(props);
        // this.validate=this.validate.bind(this);
        this.firstNameRegistr='';
        this.lastNameRegistr='';
        this.emailRegistr='';
        this.passwordRegistr='';
        this.confirmPasswordRegistr='';
        this.phoneRegistr='';
    
        this.divFNameRegistr = React.createRef();
        this.divLNameRegistr = React.createRef();
        this.divPhoneRegistr = React.createRef();
        this.divEmailRegistr = React.createRef();
        this.divPassRegistr = React.createRef();
        this.divConfirmPassRegistr = React.createRef();
        this.btnSubmitRegistr= React.createRef();

        this.validAll = false;
        this.validFirstName = false;
        this.validLastName = false;
        this.validPhone = false;
        this.validEmail = false;
        this.validPasword = false;
        this.validConfirmPassword = false;

      }
      
      handleSubmitRegistr = event => 
      {
        event.preventDefault();
        //const
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

          axios.post(server_url + '/api/Registration',userRegister)
          .then(function (response) {
              //handle success
              window.location.reload();
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
        this.validConfirmPassword = true;
        if (password != confirmPassword) {
          this.validConfirmPassword = false;
          return false;
        }
        return true;
      }

      showError() {
        if (this.validFirstName && this.validLastName && this.validPhone && this.validEmail && this.validPasword && this.validConfirmPassword) {
          this.validAll = true;
        }
        else {
          this.validAll = false;

          if (this.validFirstName) {
            this.divFNameRegistr.current.textContent='';
          }
          else {
            this.divFNameRegistr.current.textContent='Please enter a valid firstname';
          }
          if (this.validLastName) {
            this.divLNameRegistr.current.textContent='';
          }
          else {
            this.divLNameRegistr.current.textContent='Please enter a valid lastname';
          }
          if (this.validPhone) {
            this.divPhoneRegistr.current.textContent='';
          }
          else {
            this.divPhoneRegistr.current.textContent='Please enter a valid phone number';
          }
          if (this.validEmail) {
            this.divEmailRegistr.current.textContent='';
          }
          else {
            this.divEmailRegistr.current.textContent="Please enter a valid email";
          }
          if (this.validPasword) {
            this.divPassRegistr.current.textContent='';
          }
          else {
            this.divPassRegistr.current.textContent="Please enter a valid password";
          }
          if (this.validConfirmPasword) {
            this.divConfirmPassRegistr.current.textContent='';
          }
          else {
            this.divConfirmPassRegistr.current.textContent="Your password doesn't match";
          }
          
        }
      }
    
      validateFirstName() {
        if ( validator.isAlpha(this.firstNameRegistr,'en-GB')) {
          this.validFirstName = true;
          return true;
        } else {
          this.validFirstName = false;
          return false;
        }
      }
    
      validateLastName() {
        if ( validator.isAlpha(this.lastNameRegistr,'en-GB')) {
          this.validLastName=true;
          return true;
        } else {
          this.validLastName=false;
          return false;
        }
      }
    
      validatePhone() {
        if ( validator.isMobilePhone(this.phoneRegistr, 'uk-UA')) {
          this.validPhone = true;
          return true;
        } else {
          this.validPhone = false;
          return false;
        }        
      }
    
      validateEmail() {
        if ( validator.isEmail(this.emailRegistr)) {
          this.validEmail=true;
          return true;
        } else {
          this.validEmail=false;
          return false;
        }
      }
      
      validatePassword() {   
        if ( validator.isEmpty(this.passwordRegistr)==false) {
          this.validPasword=true;
          return true;
        } else {
          this.validPasword=false;
          return false;
        }
      }
       
      render() {
      return (<div>
              <nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
                 <p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
                   <div className = "container-fluid justify-content-center align-items-center navbar-collapse collapse navbarContainer">
                <Authorization/>
            </div>
          </nav>            
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Registration Form</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
             <form className="ml-3 mr-3" onSubmit={this.handleSubmitRegistr} noValidate>
      
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputFName">
          <input type="text" 
                  className="form-control"
                  onChange={(x => {this.firstNameRegistr=x.target.value; this.validateFirstName()})}  
                  name="FIRSTNAME" 
                  placeholder="First Name" 
                  required/>
          <div id="invalidFname"  className="text-muted" ref={this.divFNameRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputLName">
          <input type="text" 
                  className="form-control" 
                  onChange={(x => {this.lastNameRegistr=x.target.value; this.validateLastName()})} 
                  placeholder="Last Name" 
                  name="LASTNAME" 
                  required/>
          <div id="invalidLname"  className="text-muted" ref={this.divLNameRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
          <input type="tel"  
                  className="form-control" 
                  onChange={x=> {this.phoneRegistr=x.target.value; this.validatePhone()}} 
                  placeholder="Phone" 
                  name="phone" 
                  required/>
          <div id="invalidPhone"  className="text-muted" ref={this.divPhoneRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputEmail">
          <input type="email"  
                  className="form-control" 
                  onChange={x=> {this.emailRegistr=x.target.value; this.validateEmail()}} 
                  id="inputEmailtext" 
                  placeholder="Email" 
                  name="email" 
                  required/>
          <div id="invalidEmail" className="text-muted" ref={this.divEmailRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
          <input type="password"  
                  className="form-control" 
                  placeholder="Password" 
                  onChange={(x => {this.passwordRegistr=x.target.value; this.validatePassword()})}
                  name="password" 
                  required/>
          <div id="invalidPassword" className="text-muted" ref={this.divPassRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputConfirmPassword">
          <input type="password"  
                  className="form-control" 
                  placeholder="Confirm Password" 
                  onChange={(x => {this.confirmPasswordRegistr=x.target.value; this.checkPassword()})} 
                  onPaste={x => {x.preventDefault()}} 
                  name="confirmPassword" 
                  required/>
          <div id="invalidConfirmPassword" className='text-muted'  ref={this.divConfirmPassRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3">
      <div className="form-group col-sm-6 col-xs-12  ">
      </div>
      <div className="form-group col-sm-6 col-xs-12  ">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck"/>
          <label className="form-check-label" htmlFor="gridCheck">
            Remember Me
          </label>
        </div>
      </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-xs-3 col-sm-3 col-md-3">
          <button type="submit"  ref={this.btnSubmitRegistr} onClick={(x=>this.showError())} className="btn btn-info btn-lg mb-3">Sign up
          </button>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3" >   
          <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close
          </button>
        </div>
      </div>
    </form>
          </div>
        </div> 
      </div>
    </div>);
      }
    }
    
export default LogbarUnauth;