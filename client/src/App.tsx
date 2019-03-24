import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Header from './views/Header';
import Landing from './views/Landing';
import Messages from './views/Messages';
import NewMessage from './views/NewMessage';
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#E91E63'
    },
    secondary: {
        main: '#8BC34A'
    }
  }
});

interface Props {
  fetchUser : any;
  auth: any;
}
class App extends Component<Props> {

  componentDidMount = async () => {
    this.props.fetchUser();
  }

  render() {

    let routes;
    switch (this.props.auth) {
      case null: // Still fetching information.
        routes = (
          <div style={{marginTop: '100px'}}>
            <CircularProgress />
          </div>
        )
        break;
      case false: // User is not logged in
        routes = (
          <React.Fragment>
            <Route path="/" component={Landing} />
          </React.Fragment>
        )
        break;
      default: // User is logged in
          routes = (
            <React.Fragment>
              <Route path="/" exact component={Messages} /> 
              <Route path="/messages" exact component={Messages} />
              <Route path="/messages/new" exact component={NewMessage} />
            </React.Fragment>
          )
    }

    return (
      <div className="container">
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <React.Fragment>
              <Header />
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Switch>
                  {routes}
                  <Redirect to="/" />
                </Switch>
              </div>
            </React.Fragment>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (val : any) => {
  return { auth: val.auth };
}

export default connect(mapStateToProps, actions)(App);