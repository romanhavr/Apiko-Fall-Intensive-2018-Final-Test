import React from 'react';
import { Switch} from 'react-router';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from '../../common/ModalView';
import ProductListScene from '../ProductList/ProductListSceneView';
import ProductEdit from '../Product/ProductEditView';
import ProductAdd from '../Product/ProductAddView';
import ProductChosenScene from '../Product/ProductChosenSceneView';
import {NotFoundScene} from '../NotFound/NotFoundSceneView';
import { routes } from '../../common/routes';

const AdminSceneView = ({
    isModal,
    previousLocation,
    location,
    deleteProduct,
    ...props
}) => (
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
        <Switch location={isModal ? previousLocation : location}>
            <Route
                exact
                path={routes.admin}
                render={()=> 
                    <ProductListScene 
                        {...props}
                        onProductTitleClick = {props.handleProductTitleClick}
                        onProductDeleteClick = {deleteProduct}                            
                    />}
            />
            <Route path='*' component={NotFoundScene} />
        </Switch>
        {isModal ? 
            <Switch>
            <Route
                path={routes.productEditID}
                render={() => (
                    <Modal {...props} >
                        <ProductEdit
                            {...props}
                            productId={location.state.id}
                            onProductEditSave = {props.handleProductEditSave}
                            onTitleValueChange = {props.handleTitleValueChange}
                            onPriceValueChange = {props.handlePriceValueChange} 
                            onImageUrlValueChange = {props.handleImageUrlValueChange} 
                            onDescriptionValueChange = {props.handleDescriptionValueChange}
                        />
                    </Modal>
                )}
            />
            <Route
                path={routes.productAdd}
                render={() => (
                    <Modal {...props} >
                        <ProductAdd
                            {...props}
                            onProductAddSave = {props.handleProductAddSave}
                            onTitleValueChange = {props.handleTitleValueChange}
                            onPriceValueChange = {props.handlePriceValueChange} 
                            onImageUrlValueChange = {props.handleImageUrlValueChange} 
                            onDescriptionValueChange = {props.handleDescriptionValueChange}
                        />
                    </Modal>
                )}
            />
            <Route 
                path={routes.adminProductID}
                render={ () => (
                    <Modal {...props} >
                                <ProductChosenScene
                                    {...props}
                                />
                    </Modal>
                )}
            />
            </Switch>
            : null
        }
    </div>
);

export default withRouter(AdminSceneView);