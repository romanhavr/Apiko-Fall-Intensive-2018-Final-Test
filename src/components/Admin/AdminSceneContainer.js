import React from 'react';
import { compose, lifecycle, withState, withHandlers, pure } from 'recompose';
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

        props.editProduct();
        
        props.setTitleValue('');
        props.setPriceValue('');
        props.setImageUrlValue('');
        props.setDescriptionValue('');
    }

function handleProductAddSave(props) {
        
        const product = {};
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

            alert('New product - "'+product.title+'" added successfuly.')
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
    deleteProduct: adminProductsActions.deleteProduct,
    editProduct: adminProductsActions.editProduct,
    addProduct: adminProductsActions.addProduct,
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
            handleProductAddSave(props)
        }
    }),
);

export default enhance(AdminScene);