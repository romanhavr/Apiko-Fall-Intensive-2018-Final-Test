import { createAction } from 'redux-actions';
import * as constants from './adminProductsConstants';

export const fetchProductsStart = createAction(constants.FETCH_PRODUCTS_START);
export const fetchProductsOk = createAction(constants.FETCH_PRODUCTS_OK);
export const fetchProductsError = createAction(constants.FETCH_PRODUCTS_ERROR);
export const deleteProduct = createAction(constants.DELETE_PRODUCT);
export const deleteProductError = createAction(constants.DELETE_PRODUCT_ERROR);
export const editProduct = createAction(constants.EDIT_PRODUCT);
export const editProductError = createAction(constants.EDIT_PRODUCT_ERROR);
export const addProductError = createAction(constants.ADD_PRODUCT_ERROR);
