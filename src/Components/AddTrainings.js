import React from 'react';
import SkyLight from 'react-skylight';

class AddTrainings extends React.Component {
  constructor(props) {
      super(props);
      this.state = {date: '', activity: '', duration: ''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  // Save trainings and load trainings and finally close modal
  handleSubmit = (event) => {
      event.preventDefault();
      var newTrainings = {date: this.state.date,  duration: this.state.duration, activity: this.state.activity  };
      this.props.addTrainings(newTrainings);
      this.refs.simpleDialog.hide();
  }

  render() {
    // Add trainings page doesn't fit to default size modal
    const addTrainingsDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight dialogStyles={addTrainingsDialog} hideOnOverlayClicked ref="simpleDialog">
              <div className="card" style={{"width": "95%"}}>
              <div className="card-body">
              <h5 className="card-title">New training</h5>
              <form>
                <div className="form-group">
                  <input type="date" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input type="number" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
              </div>

                  <div className="form-group">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                  </div>
              </form>
              </div>
              </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>Add training</button>
        </div>
      </div>
    );
  }
}

export default AddTrainings;
