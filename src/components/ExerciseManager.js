import React, { Component } from 'react';
import {
	withRouter, Link
} from 'react-router-dom';
import '../App.css'
import Navigationbar from './Navigationbar';

class ExerciseManager extends Component {
    constructor(props){
        super(props)
        try{
            var validRoute = this.props.history.location.state.validRoute;
            console.log("Valid Route: " + validRoute)
          }catch(error){
            console.log("Invalid Route");
            this.props.history.push('/');
          }
    }
    render() {
        return (
            <div className="ExerciseManager">
                <Navigationbar/>
                <div className="card w-75">
                    <h2> Exercise Manager </h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to='/user/exercises' className="btn btn-primary btn-lg btn-block">
                                My Exercises
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/create' className="btn btn-primary btn-lg btn-block">
                                Create
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/edit' className="btn btn-primary btn-lg btn-block">
                                Edit
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/delete' className="btn btn-primary btn-lg btn-block">
                                Delete
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default withRouter(ExerciseManager);