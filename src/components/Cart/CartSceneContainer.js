import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent, lifecycle } from 'recompose';
import * as cartSelectors from '../../modules/cart/cartSelectors';
import * as cartOperations from '../../modules/cart/cartOperations';
import * as cartActions from '../../modules/cart/cartActions';
import CartSceneView from './CartSceneView';

const CartScene = props => (
    <CartSceneView {...props} />
)

const CartEmpty = () => {
    return <p>There are no chosen products in your Cart.</p>
}

const mapStateToProps = (state) => ({
    items: cartSelectors.getProducts(state),
    totalPrice: cartSelectors.getTotalPrice(state),
});

const mapStateToDispatch = {
    getEntities: cartOperations.getEntities,
    addToCart: cartActions.add,
    removeFromCart: cartActions.remove,
    removeAllFromCart: cartActions.removeAll,
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapStateToDispatch,
    ),
    lifecycle({
        componentDidMount() {
            this.props.getEntities() 
        }
    }),
    branch(
        ({items}) => {
            return items.length === 0
        },
        renderComponent(CartEmpty)
    )
);

export default enhance(CartScene);