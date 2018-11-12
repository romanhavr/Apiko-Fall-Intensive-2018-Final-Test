import { createSelector } from 'reselect';

const getProductsIds = state => state.products.products;
const getProductsEntities = state => state.entities.products;

export const getProducts = createSelector(
    [getProductsIds, getProductsEntities],
    (products, entities) => products.map(id => entities[id]));