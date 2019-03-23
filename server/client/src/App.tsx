import React, { Component } from 'react';
import './App.css';
require('materialize-css/dist/css/materialize.min.css');
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from './actions';

const Landing  = () => <h2>Landing</h2>
const Dashboard  = () => <h2>Surveys</h2>
const Survey  = () => <h2>Survey</h2>

interface Props {
  fetchUser : any;
}
class App extends Component<Props> {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" exact component={Survey} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);