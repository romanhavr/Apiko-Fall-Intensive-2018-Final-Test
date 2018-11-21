import React from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";

const CartScene = ({
    items,
    totalPrice,
    addToCart,
    removeFromCart,
    removeAllFromCart
}) => (
    <div>
        <h2>
            Your Cart
        </h2>
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
                        state: { modal: true, cart: true }
                    }}>
                    <span>
                        {p.title}
                    </span>            
                </Link>
                {p.count
                    ? <span>
                        {p.count} 
                        <span
                            style={{
                                color: 'olivedrab',
                                cursor: 'pointer'
                            }}
                            onClick = {() => addToCart(p)}
                        ><b> + </b></span>
                        /
                        <span
                            style={{
                                color: 'red',
                                cursor: 'pointer'
                            }}
                            onClick={() => removeFromCart(p.id)}
                        ><b> - </b></span>
                    </span>
                    : null
                }
                <span className='price'>
                    {p.price} UAH
                </span>
            </div>)
        )}
        <hr />
        <div className='cart-list'>
            <button
                className='add-edit-delete-button delete'
                onClick={() => removeAllFromCart()}
            >
                Clear your cart
            </button>
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
        </div>
        <button className='buy-button'>
            Pay...
        </button>
    </div>
);

export default withRouter(CartScene);