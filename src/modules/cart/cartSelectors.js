import { createSelector } from 'reselect';

const getProductsIds = state => {
    const ids = state.cart.items;

    let unique_array = [];
    let counter = []

    for(let i = 0;i < ids.length; i++){
        if(unique_array.indexOf(ids[i]) === -1){
            unique_array.push(ids[i]);
            counter[ids[i]] = 1;
        } else {
            counter[ids[i]] += 1;
        }
    }
    return ({
        ids: unique_array,
        count: counter
    })
};

const getProductsEntities = state => state.entities.products;

export const getProducts = createSelector(
    [getProductsIds, getProductsIds, getProductsEntities],
    ({ids}, {count}, entities) => 
        ids.map(id => Object.assign(entities[id], {count: count[id]}))
    );

export const getTotalPrice = createSelector(
    [getProducts],
    items => items.reduce((acc, item) => acc + item.price*item.count, 0)
);