import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import AddCustomers from './AddCustomers';
import AddTrainings from './AddTrainings';

class CustomersList extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.loadCustomers();
  }

  // Load customers from REST API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content
      });
    })
  }

  // Delete customers
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCustomers())
        .catch(err => console.error(err))

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
  }

  // Create new customers
  addCustomers(customers) {
    fetch('https://customerrest.herokuapp.com/api/customers',
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customers)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

    // Update customers
    updateCustomers(customers, link) {
      fetch(link,
      { method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customers)
      })
      .then(
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      )
      .catch( err => console.error(err))
    }

    // Create new trainings to customers
    addTrainings(trainings) {
      fetch('https://customerrest.herokuapp.com/api/trainings',
      {   method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trainings)
      })
      .then(res => this.loadTrainings())
      .catch(err => console.error(err))
    }


  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.customers];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {
    return (
      <div className="App-body">
      <div className="row">
        <AddCustomers addCustomers={this.addCustomers} loadCustomers={this.loadCustomers} />
        </div>
        <ReactTable data={this.state.customers}
        columns={[
            {
              columns: [
                {
                  accessor: "links[0].href",
                  show: false,
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 130,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<AddTrainings addTrainings={this.addTrainings} loadCustomers={this.loadCustomers} customer={(value)} />)
                },
                {
                  Header: "First Name",
                  accessor: "firstname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Last Name",
                  accessor: "lastname",
                  Cell: this.renderEditable
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                  Cell: this.renderEditable
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                  Cell: this.renderEditable
                },
                {
                  Header: "City",
                  accessor: "city",
                  Cell: this.renderEditable
                },
                {
                  Header: "Email",
                  accessor: "email",
                  Cell: this.renderEditable
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value, row}) => (<button className="btn btn-default btn-primary" onClick={()=>{this.updateCustomers(row, value)}}>Save</button>)
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-danger" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }

              ]
            }
          ]}
          filterable
          className="-highlight" >
        </ReactTable>
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default CustomersList;
