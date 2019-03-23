import * as React from 'react';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        node-google-oauth
                    </a>
                    <ul className="right">
                        <li>
                            <a>Login with Google</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;