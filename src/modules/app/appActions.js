import { createAction } from 'redux-actions';
import * as constants from './appConstants';

export const fetchUserOk = createAction(constants.FETCH_USER_OK);
export const logOut = createAction(constants.LOG_OUT);