import { handleActions } from 'redux-actions';
import * as constants from './appConstants';
import * as Api from '../../api/api';

const initialState = {
    user: {},
};

export default handleActions(
    {
        [constants.FETCH_USER_OK]: (state, action) => ({  
            ...state,
            user: action.payload.user,
        }),
        [constants.LOG_OUT]: (state) => {
            Api.removeToken();
            return ({
            ...state,
            user: {},
        })},
    },
    initialState,
)