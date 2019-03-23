import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from './actions';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#D81B60'
    },
    secondary: {
        main: '#81C784'
    }
  }
});

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
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <React.Fragment>
              <Header />
              <div style={{width: '500px', display: 'flex', justifyContent: 'center'}}>
                <Route path="/" exact component={Landing} />
                <Route path="/surveys" exact component={Dashboard} />
              </div>
            </React.Fragment>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(App);