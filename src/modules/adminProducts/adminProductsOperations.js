import { normalize } from 'normalizr';
import * as schemes from '../../api/schemes';
import * as actions from './adminProductsActions';
import * as Api from '../../api/api';

export const fetchProducts = () => async (dispatch, getState) => {

    try {
        const ids = getState().adminProducts.products;
        if (ids.length > 0 ) {
            return
        }

        dispatch(actions.fetchProductsStart());

        const res = await Api.Products.fetchProducts();
        const { result, entities } = normalize(
            res.data,
            schemes.ProductCollection
        );
 
        dispatch(actions.fetchProductsOk({
            ids: result,
            entities,
        }));

    } catch (err) {
        dispatch(actions.fetchProductsError(err.message));
    };
};

export const addProduct = (product) => async (dispatch) => {
    try {
        await Api.Products.addProduct(product);
    } catch (err) {
        dispatch(actions.addProductError(err.message))
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await Api.Products.deleteProduct(id);
    } catch (err) {
        dispatch(actions.deleteProductError(err.message))
    }
}

export const editProduct = (id, product) => async (dispatch) => {
    try {
        await Api.Products.editProduct(id, product);
    } catch (err) {
        dispatch(actions.editProductError(err.message))
    }
}