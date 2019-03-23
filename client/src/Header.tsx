import * as React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

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
                    <Button href="/auth/google" variant="contained" color="secondary">Login with Google</Button>
                )
            default:
                return (
                    <React.Fragment>
                        <span style={{marginRight: '20px'}}>{this.props.auth.email}</span>
                        <Button href="/api/logout">Logout</Button>
                    </React.Fragment>
                )
        }
    }

    render() {

        return (
            <AppBar position="static">
                <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
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