import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            text: {
                color: 'white'
            }
        }
    },
    palette: {
      primary: {
          main: '#FFFFFF'
      }
    }
});

interface Props {
    auth: any;
}
class Header extends React.Component<Props> {

    renderContent() {
        switch(this.props.auth) {
            case null:
                return '...';
            case false:
                return (
                    <MuiThemeProvider theme={theme}>
                        <Button href="/auth/google" color="primary">Login with Google</Button>
                    </MuiThemeProvider>
                )
            default:
                return (
                    <React.Fragment>
                        <span style={{marginRight: '20px'}}>{this.props.auth.email}</span>
                        <MuiThemeProvider theme={theme}>
                            <Button color="primary" href="/api/logout">Logout</Button>
                        </MuiThemeProvider>
                    </React.Fragment>
                )
        }
    }

    render() {

        return (
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                    node-google-oauth
                </Typography>
                    {this.renderContent()}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}


export default connect(mapStateToProps)(Header);