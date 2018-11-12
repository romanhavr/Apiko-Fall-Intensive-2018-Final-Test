import { createAction } from 'redux-actions';
import * as constants from './cartConstants';

export const add = createAction(constants.ADD);
export const remove = createAction(constants.REMOVE);
export const removeAll = createAction(constants.REMOVE_ALL);
export const getEntities = createAction(constants.GET_ENTITIES);
export const getEntitiesError = createAction(constants.GET_ENTITIES_ERROR);