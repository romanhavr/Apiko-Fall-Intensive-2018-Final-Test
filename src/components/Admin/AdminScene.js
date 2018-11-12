import React from 'react';
import { Switch} from 'react-router';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as adminProductsOperations from '../../modules/adminProducts/adminProductsOperations';
import * as adminProductsSelectors from '../../modules/adminProducts/adminProductsSelectors';
import * as adminProductsActions from '../../modules/adminProducts/adminProductsActions';
import Modal from '../../common/modal';
import ProductListScene from '../ProductList/ProductListScene';
import ProductEdit from '../Product/ProductEdit';
import ProductAdd from '../Product/ProductAdd';
import {NotFoundScene} from '../NotFound/NotFoundScene';
import { routes } from '../../common/routes';
import uuid from 'uuid';

class AdminScene extends React.Component {
    constructor(props) {
		super(props);

        this.handleProductTitleClick = this.handleProductTitleClick.bind(this);
        this.handleProductEditSave = this.handleProductEditSave.bind(this);
        this.handleProductAddSave = this.handleProductAddSave.bind(this);
        this.handleTitleValueChange = this.handleTitleValueChange.bind(this);
        this.handlePriceValueChange = this.handlePriceValueChange.bind(this); 
        this.handleImageUrlValueChange = this.handleImageUrlValueChange.bind(this); 
        this.handleDescriptionValueChange = this.handleDescriptionValueChange.bind(this); 

        this.state = {
            titleValue: '',
            priceValue: '',
            imageUrlValue: '',
            descriptionValue: ''
        };
    } 

    componentDidMount() {
        this.props.fetchProducts();
    }; 

    handleProductTitleClick(id) {
        const currentProductIndex = this.props.products.findIndex(i => 
            i.id === id);
    
        if (currentProductIndex === -1) {
            return
        }
        const product = this.props.products[currentProductIndex];
        product.show = !product.show;

        const newProducts = [...this.props.products];
        newProducts[currentProductIndex] = product;
        
        this.setState({
            products: newProducts
        });
    };

    handleTitleValueChange(titleValue) {
		this.setState({titleValue});
    };

    handlePriceValueChange(priceValue) {
        this.setState({priceValue});
    }

    handleImageUrlValueChange(imageUrlValue) {
        this.setState({imageUrlValue});
    }

    handleDescriptionValueChange(descriptionValue) {
        this.setState({descriptionValue});
    }

    handleProductEditSave(id) {
        const currentProductIndex = this.props.products.findIndex(i => 
            i.id === id);
    
        if (currentProductIndex === -1) {
            return
        }
        const product = this.props.products[currentProductIndex];
        
        product.title = this.state.titleValue 
            ? this.state.titleValue 
            : product.title;
        product.price = this.state.priceValue
            ? this.state.priceValue 
            : product.price;
        product.image = this.state.imageUrlValue
            ? this.state.imageUrlValue 
            : product.image;
        product.description = this.state.descriptionValue
            ? this.state.descriptionValue 
            : product.description;

        this.props.editProduct();
        
        this.setState({
            titleValue: '',
            priceValue: '',
            imageUrlValue: '',
            descriptionValue: ''
        });
    }

    handleProductAddSave() {
        
        const product = {};
        product.id = uuid.v1();
        product.title = this.state.titleValue 
            ? this.state.titleValue 
            : alert('Enter product title!');
        product.price = this.state.priceValue
            ? this.state.priceValue 
            : alert('Enter product price!');
        product.image = this.state.imageUrlValue
            ? this.state.imageUrlValue 
            : alert('Enter product image URL !');
        product.description = this.state.descriptionValue
            ? this.state.descriptionValue 
            : alert('Enter product description!');        
        
        if (
            product.id &&
            product.title &&
            product.price &&
            product.image &&
            product.description
        ) {
            
             const newProducts = [...this.props.products];
             newProducts.push(product);
            
            this.setState({
                products: newProducts,
                titleValue: '',
                priceValue: '',
                imageUrlValue: '',
                descriptionValue: ''
            });

            this.props.addProduct(product)

            alert('New product - "'+product.title+'" added successfuly.')
        }
    }

    previousLocation = null;

    render() {
        const { location, history } = this.props;
        if (
            !this.previousLocation ||
            (history.action !== 'POP' &&
                (!location.state || !location.state.modal))
            ) {
            this.previousLocation = location;
            }

        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        );         

    return (
        <div>
            <Link 
                to={{
                pathname: `/admin/product/add`,
                state: { modal: true }
             }}>
                <button className='add-edit-delete add'>
                    Add product
                </button> 
            </Link>
            <Switch location={isModal ? this.previousLocation : location}>
                <Route
                    exact
                    path={routes.admin}
                    render={()=> 
                        <ProductListScene 
                            {...this.props}
                            {...this.state}
                            onProductTitleClick = {this.handleProductTitleClick}
                            onProductDeleteClick = {this.props.deleteProduct}                            
                        />}
                />
                <Route path='*' component={NotFoundScene} />
            </Switch>
            {isModal ? 
                <Switch>
                <Route
                    path={routes.productEditID}
                    render={props => (
                        <Modal {...props} >
                            <ProductEdit
                                {...props}
                                {...this.props}
                                {...this.state}
                                productId={location.state.id}
                                onProductEditSave = {this.handleProductEditSave}
                                onTitleValueChange = {this.handleTitleValueChange}
                                onPriceValueChange = {this.handlePriceValueChange} 
                                onImageUrlValueChange = {this.handleImageUrlValueChange} 
                                onDescriptionValueChange = {this.handleDescriptionValueChange}
                            />
                        </Modal>
                    )}
                />
                <Route
                    path={routes.productAdd}
                    render={props => (
                        <Modal {...props} >
                            <ProductAdd
                                {...props}
                                {...this.props}
                                {...this.state}
                                onProductAddSave = {this.handleProductAddSave}
                                onTitleValueChange = {this.handleTitleValueChange}
                                onPriceValueChange = {this.handlePriceValueChange} 
                                onImageUrlValueChange = {this.handleImageUrlValueChange} 
                                onDescriptionValueChange = {this.handleDescriptionValueChange}
                            />
                        </Modal>
                    )}
                />
                </Switch>
                : null
            }
        </div>
    );
  }
}

const mapStateToProps = state => ({
    products: adminProductsSelectors.getProducts(state),
    isLoading: state.adminProducts.isLoading,
    isAdmin: state.adminProducts.isAdmin,
    isError: !!state.adminProducts.error,
    isError: state.adminProducts.error,
});

const mapStateToDispatch = {
    fetchProducts: adminProductsOperations.fetchProducts,
    deleteProduct: adminProductsActions.deleteProduct,
    editProduct: adminProductsActions.editProduct,
    addProduct: adminProductsActions.addProduct,
};

export default connect(
    mapStateToProps,
    mapStateToDispatch,
)(withRouter(AdminScene));