import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import AddCustomers from './AddCustomers';


class TrainingsList extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
    moment().format("MMMM Do YYYY, h:mm:ss a");
  }

  // Load trainingss from REST API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData.content,
      });
    })
  }

  // Delete trainings
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadTrainings())
        .catch(err => console.error(err))

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
  }

  // Create new trainings
  /* addTrainings(trainings) {
    fetch('https://customerrest.herokuapp.com/api/trainings',
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainings)
    })
    .then(res => this.loadTrainings())
    .catch(err => console.error(err))
  } */

    // Update trainings
    updateTrainings(trainings, link) {
      fetch(link,
      { method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainings)
      })
      .then(
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      )
      .catch( err => console.error(err))
    }


  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.trainings];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ trainings: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.trainings[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {
    return (
      <div className="App-body">
        {   /* <div className="row">
          <AddTrainings addTrainings={this.addTrainings} loadTrainings={this.loadTrainings} />
        </div> */}
        <ReactTable data={this.state.trainings}
        columns={[
            {
              columns: [

                {
                  Header: "Date",
                  accessor: "date",
                  Cell: ({value}) => (moment.utc(value).format('MMMM Do YYYY, h:mm a'))
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                  Cell: this.renderEditable
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                  Cell: this.renderEditable
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value, row}) => (<button className="btn btn-default btn-link" onClick={()=>{this.updateTrainings(row, value)}}>Save</button>)
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
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

export default TrainingsList;
