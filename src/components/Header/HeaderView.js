import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { routes } from '../../common/routes';

const HeaderView = ({
    cartItemsCount,
    user,
    logOut,
    history
}) => (
    <div>
        <ul className = 'navigation'>
            <li> <Link to={routes.about}>About</Link> </li>
            <li> <Link to={routes.contact}>Contact</Link> </li>
            <li> <Link to={routes.termsandconditions}>Terms and conditions</Link> </li>
            <li> <Link to={routes.privacypolicy}>Privacy policy</Link> </li>
        </ul>
        <div className="header">
            <h1
                style={{cursor: 'pointer'}}
                onClick = {() => {history.push('/')}}
            >
                My Internet SHOP</h1>
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
                        <span 
                            style = {{cursor: 'pointer'}}
                            onClick = {() => {
                                logOut();
                                history.push('/')
                            }}
                        >
                            Log out
                        </span>
                    </span>
                    : <span>
                        <Link to = {routes.login}>
                            Log in 
                        </Link>
                        &ensp;/&ensp;
                        <Link to = {routes.register}>   
                            Register
                        </Link> 
                    </span>
                }
            </span>
            <Link 
            to={{
                pathname: `${routes.cart}`,
                state: { modal: true }
            }}>
                <span className='cart'>
                    Cart
                    <b>    
                        {cartItemsCount
                            ? <span>({cartItemsCount})</span>
                            : null
                        }
                    </b>
                </span>
            </Link>
        </div>
    </div>
);

export default withRouter(HeaderView);