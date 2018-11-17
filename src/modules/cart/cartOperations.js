import * as actions from './cartActions';
import axios from 'axios';

export const getEntities = () => (dispatch, getState) => {
    try {
        const ids = getState().cart.items;
        const entities = getState().entities.products;

        if (ids.length === 0) {
            return;
        }

        ids.map(id => {
            if (entities[id]) {
                return
            } else {
                entities[id] = axios.get(`/api/v2/products?ids[]=${id}`);
            }
        })
       
        dispatch(actions.getEntities({entities}));

    } catch (err) {
        dispatch(actions.getEntitiesError(err.message));
    };
};