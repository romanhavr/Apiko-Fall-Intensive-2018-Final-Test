import React from 'react';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import * as adminProductsOperations from '../../modules/adminProducts/adminProductsOperations';
import * as adminProductsSelectors from '../../modules/adminProducts/adminProductsSelectors';
import * as adminProductsActions from '../../modules/adminProducts/adminProductsActions';
import uuid from 'uuid';
import AdminSceneView from './AdminSceneView';

const AdminScene = (props) => (
    <AdminSceneView {...props} />
);

function handleProductEditSave(id, props) {

        const currentProductIndex = props.products.findIndex(i => 
            i.id === id);
    
        if (currentProductIndex === -1) {
            return
        }
        const product = props.products[currentProductIndex];

        if (props.imageUrlValue.length >= 255 ) {
            alert('Image URL must be NO longer than 255 symbols!');
            return
        };

        product.title = props.titleValue 
            ? props.titleValue 
            : product.title;
        product.price = props.priceValue
            ? props.priceValue 
            : product.price;
        product.image = props.imageUrlValue
            ? props.imageUrlValue
            : product.image;
        product.description = props.descriptionValue
            ? props.descriptionValue 
            : product.description;

        props.history.push(props.previousLocation)

        props.editProduct(id, product);
        props.editProductInList();
        
        props.setTitleValue('');
        props.setPriceValue('');
        props.setImageUrlValue('');
        props.setDescriptionValue('');
    }

function ProductAddSave(props) {
        
        const product = {};

        if (props.imageUrlValue.length >= 255 ) {
            alert('Image URL must be NO longer than 255 symbols!');
            return
        };

        product.id = uuid.v1();
        product.title = props.titleValue 
            ? props.titleValue 
            : alert('Enter product title!');
        product.price = props.priceValue
            ? props.priceValue 
            : alert('Enter product price!');
        product.image = props.imageUrlValue
            ? props.imageUrlValue 
            : alert('Enter product image URL !');
        product.description = props.descriptionValue
            ? props.descriptionValue 
            : alert('Enter product description!');        
        
        if (
            product.id &&
            product.title &&
            product.price &&
            product.image &&
            product.description
        ) {            
            props.products.push(product);

            props.setTitleValue('');
            props.setPriceValue('');
            props.setImageUrlValue('');
            props.setDescriptionValue('');
           
            props.history.push(props.previousLocation);

            props.addProduct(product);
        }
    }

let previousLocation = null;

function isModal(props) {
        
    const { location, history } = props;
    
    if (
        !previousLocation ||
        (history.action !== 'POP' &&
            (!location.state || !location.state.modal))
    ) {
        previousLocation = location;
    }
    
    const isModal = !!(
        location.state &&
        location.state.modal &&
        previousLocation !== location
    )
    
    return {isModal, previousLocation}
}   

const mapStateToProps = (state, props) => ({
    products: adminProductsSelectors.getProducts(state),
    isLoading: state.adminProducts.isLoading,
    isAdmin: state.adminProducts.isAdmin,
    isError: !!state.adminProducts.error,
    isErrorMessage: state.adminProducts.error,
    isModal: isModal(props).isModal,
    previousLocation: isModal(props).previousLocation
});

const mapStateToDispatch = {
    fetchProducts: adminProductsOperations.fetchProducts,
    deleteProduct: adminProductsOperations.deleteProduct,
    deleteProductFromList: adminProductsActions.deleteProduct,
    editProduct: adminProductsOperations.editProduct,
    editProductInList: adminProductsActions.editProduct,
    addProduct: adminProductsOperations.addProduct,
};

const enhance = compose(
    connect(
        mapStateToProps,
        mapStateToDispatch,
    ),
    lifecycle({
        componentDidMount() {
            this.props.fetchProducts();
        }
    }),
    withState('titleValue', 'setTitleValue', ''),
    withState('priceValue', 'setPriceValue', ''),
    withState('imageUrlValue', 'setImageUrlValue', ''),
    withState('descriptionValue', 'setDescriptionValue', ''),
    withHandlers({
        handleTitleValueChange: props => value => {
            props.setTitleValue(value)
        },
        handlePriceValueChange: props => value => {
            props.setPriceValue(value)
        },
        handleImageUrlValueChange: props => value => {
            props.setImageUrlValue(value)
        },
        handleDescriptionValueChange: props => value => {
            props.setDescriptionValue(value)
        },
        handleProductEditSave: props => id => {
            handleProductEditSave(id, props)
        },
        handleProductAddSave: props => () => {
            ProductAddSave(props)
        },
        handleDeleteProduct: props => id => {
            props.deleteProduct(id);
            props.deleteProductFromList(id)
        }
    }),
);

export default enhance(AdminScene);