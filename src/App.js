import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
//import importedComponent from 'react-imported-component';


import Painel from './Painel'

import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


//import logo from './logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Painel} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
