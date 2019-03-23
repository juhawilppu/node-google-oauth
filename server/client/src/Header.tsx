import * as React from 'react';
import { connect } from 'react-redux';

interface Props {
    auth: any;
}
class Header extends React.Component<Props> {

    renderContent() {
        console.log(this.props.auth);

        switch(this.props.auth) {
            case null:
                return '...';
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                )
            default:
                return (
                    <li>
                        {this.props.auth.email}
                        <a href="/api/logout">Logout</a>
                    </li>
                )
        }
    }

    render() {

        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        node-google-oauth
                    </a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (val : any) => {
    console.log('val.auth', val.auth);
    return { auth: val.auth };
}


export default connect(mapStateToProps)(Header);