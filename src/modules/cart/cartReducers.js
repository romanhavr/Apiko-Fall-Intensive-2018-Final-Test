import { handleActions } from 'redux-actions';
import * as constants from './cartConstants';

const initialState = {
    items: [],
};

export default handleActions(
    {
        [constants.ADD]: (state, action) => {
            const items = state.items;
            return ({
                ...state,
                items: items.concat(action.payload.id),
        })},
        [constants.REMOVE]: (state, action) =>{
            const items = state.items;
            items.splice(items.lastIndexOf(action.payload), 1)
            return ({
            ...state,
            items: items
        })},
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