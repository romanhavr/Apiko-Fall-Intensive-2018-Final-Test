import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import * as productsOperations from '../../modules/products/productsOperations';
import * as productsSelectors from '../../modules/products/productsSelectors';
import * as cartActions from '../../modules/cart/cartActions';
import UserSceneView from './UserSceneView';

const UserScene = props => (
    <UserSceneView {...props} />
);

let previousLocation = null;

function isModal(props) {
    
    const { location, history } = props;

    if (
        !previousLocation ||
        (history.action !== 'POP' &&
            (!location.state || !location.state.modal))
    ) {
        previousLocation = location;
    }

    const isModal = !!(
        location.state &&
        location.state.modal &&
        previousLocation !== location
    )

    return {isModal, previousLocation}
}

const mapStateToProps = (state, props) => ({
    products: productsSelectors.getProducts(state),
    isLoading: state.products.isLoading,
    isError: !!state.products.error,
    isErrorMessage: state.products.error,
    isModal: isModal(props).isModal,
    previousLocation: isModal(props).previousLocation
});

const mapStateToDispatch = {
    fetchProducts: productsOperations.fetchProducts,
    addToCart: cartActions.add
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapStateToDispatch,
    ),
    lifecycle({
        componentDidMount() {
            this.props.fetchProducts()
        } 
    })
);

export default enhance(UserScene);