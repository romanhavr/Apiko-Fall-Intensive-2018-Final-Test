import { handleActions } from 'redux-actions';
import * as constants from './cartConstants';

const initialState = {
    items: [],
};

export default handleActions(
    {
        [constants.ADD]: (state, action) => ({
            ...state,
            items: [action.payload.id].concat(state.items),
        }),
        [constants.REMOVE]: (state, action) => ({
            ...state,
            items: state.items.filter(i => i !== action.payload)
        }),
        [constants.REMOVE_ALL]: (state) => ({
            ...state,
            items: [],
        }),
        [constants.GET_ENTITIES]: (state, action) => ({
            ...state,
            entities: [action.payload.entities].concat(state.entities),
        }),
        [constants.GET_ENTITIES_ERROR]: (state, action) => ({
            ...state,
            error: action.payload.messsage,
        }),
    },
    initialState,
)