import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import AddAllergy from './../modaldialogs/AddAllergy';

class AllergiesCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idAllergy: 0
        }
    }

    SaveAll(){
        var data = {
            Visit:this.props.Visit,
            PatientId:this.props.PatientId
        }
    }

    render(){
        return(
            <div>
            <div className="row ml-4"> 
                <div className="col-sm-5 col-md-2 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#AddAllergyModal">Add allergy</button>
                </div>
            </div>

            <AddAllergy Visit={this.props.Visit} PatientId={this.props.PatientId}/>
        </div>
        )
    }
}

export default AllergiesCard