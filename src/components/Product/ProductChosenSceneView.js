import React from 'react';
import { withRouter } from "react-router-dom";

const ProductChosenScene = ({
    match,
    products,
    onCartAddClick,
    isAdmin,
    location
}) => {
    const product = products.find(i => i.id === match.params.id);
    const cart = location.state ? location.state.cart : null;

    return (
        <div>
            <h4>{product.title}</h4>
                <table>
                    <tbody>
                        <tr>
                            <td className='table-image chosen'>
                                <img 
                                    src={product.image}
                                    className='product-image'
                                    alt={product.title}
                                />
                            </td>
                            <td valign='top'>
                                <span>
                                    <b>
                                        {product.price} UAH
                                    </b>
                                </span>
                                {(!isAdmin && !cart)
                                    ? <button
                                    className='add-pay-save add-edit-delete-button'
                                    onClick = {() => onCartAddClick(product)}
                                    >
                                        Add to cart
                                    </button>
                                    : null
                                }
                                <div>
                                    <p>Description:</p>
                                    {product.description}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
);}

export default withRouter(ProductChosenScene);