import React from 'react';
import SkyLight from 'react-skylight';

class AddCustomers extends React.Component {
  constructor(props) {
      super(props);
      this.state = {firstname: '', lastname: '',  streetaddress: '', postcode: '', city: '', email:'', phone:''};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  // Save customers and load customers and finally close modal
  handleSubmit = (event) => {
      event.preventDefault();
      var newCustomers = {firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone};
      this.props.addCustomers(newCustomers);
      this.props.loadCustomers();
      this.refs.simpleDialog.hide();
  }

  render() {
    // Add customers page doesn't fit to default size modal
    const addCustomersDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight dialogStyles={addCustomersDialog} hideOnOverlayClicked ref="simpleDialog">
              <div className="card" style={{"width": "95%"}}>
              <div className="card-body">
              <h5 className="card-title">New customer</h5>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Name" className="form-control" name="firstname" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input type="text" placeholder="Surname" className="form-control" name="lastname" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input type="address" placeholder="Address" className="form-control" name="streetaddress" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input type="postcode" placeholder="Postcode" className="form-control" name="postcode" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input type="text" placeholder="City" className="form-control" name="city" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                  <input class="form-control" type="phone" placeholder="1234567890" id="example-tel-input" onChange={this.handleChange}/>
              </div>

                  <div className="form-group">
                      <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                  </div>
              </form>
              </div>
              </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New customer</button>
        </div>
      </div>
    );
  }
}

export default AddCustomers;
