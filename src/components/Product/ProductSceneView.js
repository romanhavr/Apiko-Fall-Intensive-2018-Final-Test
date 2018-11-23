import React from 'react';
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

const ProductScene = ({
    item,
    id,
    title,
    price,
    image,
    onCartAddClick,
}) => (
    <div className='product'>
        <Link to={{
                pathname: `/product/${id}`,
                state: { modal: true }
            }}
        >
            <img 
                src={image}
                className='product-image'
                alt={title}
            />
            <b>{title}</b> 
        </Link>
        <div>
            <b>
                {price} UAH
            </b>
        </div>
        <button
            className='add-pay-save'
            onClick = {() => onCartAddClick(item)}
        >
            Add to cart
        </button>
    </div>
);

export default withRouter(ProductScene);