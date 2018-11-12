import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { routes } from './routes';
import { connect } from 'react-redux';

const Header = ({
    cartItemsCount
}) => (
    <div className="header">
        <h1>My Internet SHOP</h1>
        <input
            className='search'
            placeholder='Search...'
        />
        <span className='user-login'>
            <b>USER</b> / Log out
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
    cartItemsCount: state.cart.items.length
})

export default connect(mapStateToProps)(withRouter(Header));