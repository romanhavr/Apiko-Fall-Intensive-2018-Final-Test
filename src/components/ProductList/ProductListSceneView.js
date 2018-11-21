import React from 'react';
import ProductScene from '../Product/ProductSceneView';
import AdminProductScene from '../Product/AdminProductSceneView';

const ProductListScene = ({
    isLoading,
    isError,
    isErrorMessage,
    isAdmin,
    products,
    onProductDeleteClick,
    onCartAddClick
}) =>  {
    if (isLoading) 
      return <p>Loading...</p>

    if (isError)
        return <p>ERROR: {isErrorMessage}</p>
    
    return (
    <div>
        <h3>Product list</h3>    
        {isAdmin
            ? products.map((p) => (
                <AdminProductScene
                    key = {p.id}
                    item = {p}
                    {...p}
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