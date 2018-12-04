import React, { Component } from 'react';
import brawn from './brawn.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import CustomersList from './Components/CustomersList';
import TrainingsList from './Components/TrainingsList';
import Calendar from './Components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={brawn} className="App-logo" alt="logo" />
            <span className="App-title">Personal Trainer </span>
        </header>

        <BrowserRouter baseline>
          <div>
            <Navbar />

    <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/CustomersList" component={CustomersList}/>
          <Route path="/TrainingsList" component={TrainingsList}/>
          <Route path="/Calendar" component={Calendar}/>
    </Switch>

        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
