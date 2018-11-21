import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as appActions from '../../modules/app/appActions';
import HeaderView from './HeaderView';

const Header = props => (
    <HeaderView {...props} />
)

const mapStateToProps = state => ({
    cartItemsCount: state.cart.items.length,
    user: state.app.user,
})

const mapStateToDispatch = {
    logOut: appActions.logOut,
}

const enhance = compose(
    connect(
        mapStateToProps,
        mapStateToDispatch
    ),
);

export default enhance(Header);