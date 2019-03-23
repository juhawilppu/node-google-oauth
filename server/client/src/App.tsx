import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from './actions';

const Landing  = () => (
  <React.Fragment>
    <h2>Welcome to node-google-oauth</h2>
    <div>Login to proceed.</div>
  </React.Fragment>
)
import Dashboard from './Dashboard';

interface Props {
  fetchUser : any;
}
class App extends Component<Props> {

  componentDidMount = async () => {
    const response = this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);