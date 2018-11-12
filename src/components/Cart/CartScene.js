import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as cartSelectors from '../../modules/cart/cartSelectors';
import * as cartOperations from '../../modules/cart/cartOperations';

const CartScene = ({
    items,
    totalPrice,
    getEntities,
    onRemoveClick,
    onRemoveAllClick
}) => {
    
    getEntities();

    if (items.length === 0) {
       return <p>There are not chosen products in your Cart.</p>
    } 

    return (
    <div>
        <p />
        {items.map( p => 
            (<div 
                className='cart-list'
                key={p.id}
            >
                <img 
                    src={p.image}
                    className='cart-image'
                    alt={p.title}
                />
                <Link 
                    to={{
                        pathname: `/product/${p.id}`,
                        state: { modal: true }
                    }}>
                    <span>
                        {p.title}
                    </span>
                    
                </Link>
                <span className='price'>
                    {p.price} UAH
                </span>
                <button
                    className='add-edit-delete-button delete'
                    onClick={() => onRemoveClick(p.id)}
                >
                    Remove from cart
                </button>
            </div>)
        )}
        <hr />
        <div className='cart-list'>
            <span>
                <b>
                    Total price:
                </b>
            </span>
            <span className='price'>
                <b>
                    {totalPrice} UAH
                </b>
            </span>
            <button className='buy-button'>
                Pay...
            </button>
            <button
                className='add-edit-delete-button delete'
                onClick={() => onRemoveAllClick()}
            >
                Remove all from cart
            </button>
            <p />
        </div>
    </div>
)}

const mapStateToProps = (state) => ({
    items: cartSelectors.getProducts(state),
    totalPrice: cartSelectors.getTotalPrice(state),
});

const mapStateToDispatch = {
    getEntities: cartOperations.getEntities,
};

export default connect(
    mapStateToProps,
    mapStateToDispatch,
)(withRouter(CartScene));