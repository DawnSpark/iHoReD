import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Logbar from './Logbar.js';
import axios from 'axios';
const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"
class App extends Component {
  render() {
    return (
        <div className="App container-fluid">
        <Logbar/>
        <div className="wrapper row mt-4">
        <ProfessionsTable/>
        <ProfessionTable/>
        <Datepicker/>
        </div>
        <Footerbar/>
      </div>
    );
  }
}

function Logbar(props){
  return <div>
  			<nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
 			<p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
   			<div className = "container-fluid justify-content-center align-items-center navbar-collapse collapse ">
                <form className="form-inline" action="/action_page.php">
                    <input className="form-control mr-3" type="text" placeholder="Login"/> 
                    <input className="form-control mr-3" type="text" placeholder="Password"/> 
                    <div>
                    <button className="btn btn-info mr-2" type="submit">Sign in</button>
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign up</button> 
                    </div>
                    </form> 
                    </div>
        </nav>            
  <div className="modal fade" id="myModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Please, fill in the fields to register:</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <form className="was-validated" noValidate>
  <div className="form-row mb-3">
  <div className="form-group col-sm-6 col-xs-12">
      <input type="text" className="form-control" id="inputFName" placeholder="First Name" required/>
      <div className="invalid-tooltip">
        Plese,enter your first name!
      </div>
    </div>
    <div className="form-group col-sm-6 col-xs-12">
      <input type="text" className="form-control" id="inputLName" placeholder="Last Name" required/>
      <div className="invalid-tooltip">
        Plese,enter your last name!
      </div>
    </div>
    </div>
    <div className="form-row mb-3">
    <div className="form-group col-sm-6 col-xs-12">
      <input type="email" className="form-control" id="inputEmail4" placeholder="Email" required/>
      <div className="invalid-tooltip">
        Plese,enter valid email!
      </div>
    </div>
    <div className="form-group col-sm-6 col-xs-12">
      <input type="password" className="form-control" id="inputPassword4" placeholder="Password" required/>
      <div className="invalid-tooltip">
        Plese,enter your password!
      </div>
    </div>
    </div>
    <div className="form-group col-sm-6 col-xs-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div className="modal-footer form-group">
  <div className="row">
  <div className="col-12 col-sm-6 col-md-6">
        <button type="submit" className="btn btn-info btn-lg">Sign up
          </button>
    </div>
    <div className="col-12 col-sm-6 col-md-6">   
        <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close
          </button>
        </div>
    </div>
  </div>
</form>
      </div>
    </div>
  </div> 
</div>
}

function Datepicker(props){
  return <div className="col sm-2 md-9 lg-9 xl-9">
  <div className="container table-responsive">
      <table className="table table-bordered table-hover table-light">
        <thead>
        <tr>
            <th colSpan="8" className="bg-info text-white">{process.env.NODE_ENV}</th>
          </tr>
          <tr>
            <th>-/-</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th className = "table-primary">Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>09:00-09:30</th>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td className = "table-primary">-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
                  <th>09:30-10:00</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>10:00-10:30</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>10:30-11:00</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>11:00-11:30</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>11:30-12:00</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>12:00-12:30</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>12:30-13:00</th>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
}

function Footerbar(props){
  return <div>
    <p className='font-italic bg-secondary text-white text-center'>Ніхто ще не скаржився на наш сервіс!</p>
  </div>
}

class ProfessionsTable extends React.Component{
  constructor(){
    super();
    //axios.get('http://localhost:58511/ProfessionsStatic')
    axios.get(server_url+'/ProfessionsStatic')
    .then(res => {

      res.data.forEach(doctor => {
        document.getElementById("professions").innerHTML 
         += '<a href="javascript:void(0)" class="list-group-item list-group-item-active">'
         + doctor + '</a>';
      });
    });
  };
  render(){
    return <div className = "container col sm-1 md-1 lg-1 xl-1">
     <div className="list-group" id="professions">
     <a href="#" className="list-group-item active bg-info">Наявні лікарі:</a>
     </div>
  </div>
}
}
class ProfessionsTableRow extends React.Component {
  render() {
    var classi = (this.props.professionsdata.isStatic) ? "list-group-item list-group-item-active" : "list-group-item list-group-item-secondary";
     return (
      <a href="javascript:void(0)" className={classi}>{this.props.professionsdata.name}</a>
     );
  }
}
class ProfessionTable extends React.Component{
  constructor(){
    super();
    //axios.get('http://localhost:58511/api/Doctor')
    axios.get(server_url+'/api/Doctor')
    .then(res => {

      res.data.forEach(doctor => {
        document.getElementById("doctors").innerHTML 
         += '<a href="javascript:void(0)" class="list-group-item list-group-item-active">'
         + doctor.FirstName + ' ' + doctor.LastName + '</a>';
      });
    });
  };
  render(){
  return  <div className="container col sm-1 md-1 lg-1 xl-1">
                <div className="list-group" id = "doctors">
                <a href="#" className="list-group-item active bg-info ">Оберіть лікаря:</a>
                </div>
          </div>
}
}
class ProfessionTableRow extends React.Component {
  
  render() {
    return (
     <a href="javascript:void(0)" className="list-group-item list-group-item-active">{this.props.professiondata.name}</a>
    );     
  }
}

export default App;
