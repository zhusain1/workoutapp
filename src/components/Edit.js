import React from 'react';
import api from '../api/Api';
import Navigationbar from './Navigationbar'
import EditExercise from './EditExercise';
import Cookies from 'universal-cookie';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();

    // if there is no cookie
    if(cookies.get('code') === undefined || cookies.get('code').length <= 1){
      this.props.history.push('/');
    }
    
    /* Make call to check if code is valid from cookie */ 
    if(cookies.get('code') !== undefined && cookies.get('code').length > 0){
      // Server call post code and check if code is valid

      var backend = '/admin/authorize';

      const code =  {
        authCode: cookies.get('code')
      };

      api({
        method: 'post',
        url: backend,
        data: code,
        })
        .then((response) => {
            //handle success
            console.log(response.data);
        })
        .catch((response) => {
            //handle error
            this.props.history.push('/');
        });
    }

    this.state={
      bodyPart:"Chest",
      workoutNames: [],
      workoutId: []
    };

    this.handleBodyPartChange = this.handleBodyPartChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBodyPartChange(event){
    this.setState({
        bodyPart: event.target.value
    });
}

handleSubmit(event){
    event.preventDefault();
    const url = '/workouts/type/'+this.state.bodyPart;

    api.get(url)
    .then(res => {
        const workouts = res.data;
        var eNames = []
        var eId = []
        for(let i = 0; i < workouts.length; i++){
          eNames.push(workouts[i].workoutName);
          eId.push(workouts[i].id);
        }
        this.setState({
          workoutNames: eNames,
          workoutId: eId
        });
        console.log(this.state);
    })
  }

  render() {
    return (
        <div className="Edit">
            <Navigationbar />
            <div className="card  w-75">
            <h2> Select Workout to Edit </h2>
              {this.state.workoutNames.length > 0 &&
                 this.state.workoutNames.map((workout, index) => (
                  <EditExercise title={this.state.workoutNames[index]}
                       id = {this.state.workoutId[index]}     
                       key={index}> 
                   </EditExercise>
                ))}

              {this.state.workoutNames.length < 1 &&
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="bodyPart"> Find exercise: </label>
                  <br/>
                  <div className="col-3">
                  <select className="form-control" value={this.state.bodyPart} onChange={this.handleBodyPartChange}>
                      <option value="Chest">Chest</option>
                      <option value="Arms">Arms</option>
                      <option value="Legs">Legs</option>
                      <option value="Back">Back</option>
                      <option value="Abs">Abs</option>
                      <option value="Cardio">Cardio</option>
                  </select>
                  <br/>
                  </div>
                  <p>
                  <button type="submit" className="btn btn-primary">Find Exercise</button>
                  </p>
                </form>}
              </div>
            </div>
    );
  }
}


export default Edit;
