import { handleActions } from 'redux-actions';
import * as constants from './adminProductsConstants';

const initialState = {
    products: [],
    isLoading: false,
    isAdmin: true,
    error: null,
};

export default handleActions(
    {
        [constants.FETCH_PRODUCTS_START]: state => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        [constants.FETCH_PRODUCTS_OK]: (state, action) => ({  
            ...state,
            isLoading: false,
            products: action.payload.ids,
        }),
        [constants.FETCH_PRODUCTS_ERROR]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload.messsage,
        }),
        [constants.DELETE_PRODUCT]: (state, action) => {
            const products = state.products.filter(p => p !== action.payload)

            return ({
                ...state,
                products
            });
        },
        [constants.EDIT_PRODUCT]: (state) => ({
            ...state,
        }),
        [constants.ADD_PRODUCT_ERROR]: (state, action) => ({
            ...state,
            error: action.payload.messsage,
        }),
    },
    initialState,
)