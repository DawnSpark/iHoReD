import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"
//localStorage.removeItem("currentProfession");
class ProfessionsTable extends React.Component{
    
constructor(props){
    
      super(props);
      this.state = {
        idArr: [],
        id: 1
      };
      axios.get(server_url+'/ProfessionsStatic')
        .then(res => {
          res.data.forEach(profession => {
             const idArr = res.data;
             this.setState({
               idArr
             })
          });
        });
      this.eventHandler = this.eventHandler.bind(this);
    };

    // componentWillMount()
    //   {
        
    //   //   this.setState(function(prevState, props){
    //   //         return{
    //   //           id: localStorage.getItem("currentProfession")
    //   //         }
    //   // });
    // }
    
    eventHandler(idProf) {
      localStorage.setItem("currentProfession", idProf)
      alert("Im here")
      console.log(this.state.id)
      this.setState({
        id: localStorage.getItem("currentProfession")
        //id: idProf
      }
      )
      console.log(this.state.id)
    }

    componentDidUpdate(){
      console.log(this.state.id)
    }
    // getProfessions(){
    //   axios.get(server_url+'/ProfessionsStatic')
    //   .then(res => {
    //     res.data.forEach(profession => {
    //       document.getElementById("professions").innerHTML 
    //        //+= '<div  class="list-group-item list-group-item-active" onClick="item('+ profession[0] +');">'// + this.setProfession(); + '
    //        += '<div  class="list-group-item list-group-item-active" onclick=this.eventHandler>'
    //        + profession[1] + '</div>';
           
    //     });
    //   });
    //   }


    render(){
      return <div className = "container col sm-1 md-1 lg-1 xl-1" id="container">
       <div className="list-group" id="professions">
       {this.state.idArr.map(idArr => <div key={idArr.toString()} onClick={() => this.eventHandler(idArr[0])}>{idArr[1]}</div>)}
       <a href="#" className="list-group-item active bg-info">Availible doctors:</a>
       </div> 
       <DoctorTable idProf={this.state.id}/>
    </div>
    
  }
  }

  export default ProfessionsTable;