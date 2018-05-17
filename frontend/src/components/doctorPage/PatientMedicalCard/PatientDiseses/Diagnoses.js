import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Categories from './Categories';
import AddDisease from './../../modaldialogs/AddDisease';
import PropTypes from 'prop-types';

class Diagnoses extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idProf: 0,
          idDoc: 0,
          shouldUpdate: 1
        }
    }
    reloadRows(param) {
        this.props.callback(param);
    }
    getProfessionId(param) {
        this.setState({
          idProf: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
    }

    getDoctorId(param) {
        this.setState({
          idDoc: param
        })
    }

    render(){
        return(
            <div className="row justify-content-center"> 
                <div className="col-md-6 col-8 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#AddRateToProfession">Add disease
                    </button>
                </div>
                <AddDisease callback={this.reloadRows.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId}/>
            </div>
        )
    }
}
Diagnoses.propTypes = {
    callback: PropTypes.func
  };
export default Diagnoses