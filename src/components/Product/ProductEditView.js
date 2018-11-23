import React from 'react';

const ProductEdit = ({
    products,
    productId,
    titleValue,
    priceValue,
    imageUrlValue,
    descriptionValue,
    onTitleValueChange,
    onPriceValueChange,
    onImageUrlValueChange,
    onDescriptionValueChange,
    onProductEditSave
}) => {

    const product = products.find(i => i.id === productId);

    return (
        <div className='product-edit'>
            <img 
                src={product.image}
                className='edit-image'
                alt={product.title}
            />
            <p><b>Change title:</b> (current title: "{product.title}")</p>    
            <input 
                placeholder = {product.title}
                value = {titleValue}
                className = 'input'
                onChange={(e) => {onTitleValueChange(e.target.value)}}
            />
            <p><b>Change image URL:</b> (current URL: "{product.image}")</p>
            <input
                placeholder = {product.image}
                value = {imageUrlValue}
                className = 'input'
                onChange={(e) => {onImageUrlValueChange(e.target.value)}}
            />
            <p><b>Change price (UAH):</b> (current price: "{product.price}")</p>
            <input
                type = 'number'
                placeholder = {product.price}
                value = {priceValue}
                className = 'input'
                onChange={(e) => {onPriceValueChange(e.target.value)}}
            />
            <p><b>Change description:</b></p> 
            <p>(current description: "{product.description}")</p>
            <textarea
                placeholder = {product.description}
                value = {descriptionValue}
                className = 'textarea'
                onChange={(e) => {onDescriptionValueChange(e.target.value)}}
            />
            <hr />
            <button
                className='add-edit-delete-button add-pay-save'
                onClick = {() => onProductEditSave(productId)}
            >
                &emsp;Save&emsp;
            </button>
        </div>
);}

export default ProductEdit;