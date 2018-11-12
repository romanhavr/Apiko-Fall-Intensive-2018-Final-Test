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
        [constants.ADD_PRODUCT]: (state, action) => ({
                ...state,
             //   products: [action.payload.id].concat(state.products),

                        // Not working correctly with localStorage
                        // because when addind a new product it adds only its ID
                        // but not entites. It causes errors for listing methods.
        }),
    },
    initialState,
)