import React from 'react';
import ProductScene from '../Product/ProductScene';
import AdminProductScene from '../Product/AdminProductScene';

const ProductListScene = ({
    isLoading,
    isError,
    isAdmin,
    products,
    onProductTitleClick,
    onProductDeleteClick,
    onCartAddClick
}) =>  {
    if (isLoading) 
      return <p>Loading...</p>

    if (isError)
        return <p>ERROR: {isError}</p>
    return (
    <div>
        <h3>Product list</h3>    
        {isAdmin
            ? products.map((p) => (
                <AdminProductScene
                    key = {p.id}
                    {...p}
                    onTitleClick = {onProductTitleClick}
                    onDeleteClick = {onProductDeleteClick}
                />)
            )
            : products.map((p) => (
                <ProductScene
                    key={p.id}
                    {...p}
                    item = {p}
                    onCartAddClick = {onCartAddClick}
                />)
            )
        }        
    </div>
)};

export default ProductListScene;