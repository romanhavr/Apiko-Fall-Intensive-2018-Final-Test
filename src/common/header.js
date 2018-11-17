import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { routes } from './routes';
import { connect } from 'react-redux';
import * as appActions from '../modules/app/appActions';

const Header = ({
    cartItemsCount,
    user,
    logOut,
    history
}) => (
    <div className="header">
        <h1>My Internet SHOP</h1>
        <input
            className='search'
            placeholder='Search...'
        />
        <span className='user-login'>
            {user.firstName
                ? <span>
                    <b>
                        {user.firstName} {user.lastName}
                    </b>
                    /
                    <span onClick = {() => {
                        logOut();
                        history.push('/')
                        }}
                    >
                        Log out
                    </span>
                </span>
                : <Link to = {routes.auth}>
                    Log in / Register
                </Link>
            }
        </span>
        <Link 
        to={{
            pathname: `${routes.cart}`,
            state: { modal: true }
        }}>
            <span className='cart'>
                Cart
                {cartItemsCount
                    ? <span>({cartItemsCount})</span>
                    : null
                }
            </span>
        </Link>
    </div>
);

const mapStateToProps = state => ({
    cartItemsCount: state.cart.items.length,
    user: state.app.user,
})

const mapStateToDispatch = {
    logOut: appActions.logOut,
}

export default connect(
    mapStateToProps,
    mapStateToDispatch    
)(withRouter(Header));