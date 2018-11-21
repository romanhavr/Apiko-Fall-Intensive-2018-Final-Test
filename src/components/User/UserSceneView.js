import React from 'react';
import { Switch} from 'react-router';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from '../../common/ModalView';
import ProductChosenScene from '../Product/ProductChosenSceneView';
import ProductListScene from '../ProductList/ProductListSceneView';
import CartScene from '../Cart/CartSceneContainer';
import {AboutScene} from '../About/AboutSceneView';
import {ContactScene} from '../Contact/ContactSceneView';
import {TermsAndConditionsScene} from '../TermsAndConditions/TermsaAndConditionsSceneView';
import {PrivacyPolicyScene} from '../PrivacyPolicy/PrivacyPolicySceneView';
import {NotFoundScene} from '../NotFound/NotFoundSceneView';
import { routes } from '../../common/routes';

const UserSceneView = ({
    ...props
}) => (
    <div>
        <Link to={routes.about}>
            - About -
        </Link>
        <Link to={routes.contact}>
            - Contact -
        </Link>
        <Link to={routes.termsandconditions}>
            - Terms and conditions -
        </Link>
        <Link to={routes.privacypolicy}>
            - Privacy policy
        </Link>
        <Switch location={props.isModal ? props.previousLocation : props.location}>
            <Route exact path={routes.about} component={AboutScene} />
            <Route exact path={routes.contact} component={ContactScene} />
            <Route
                exact
                path={routes.termsandconditions}
                component={TermsAndConditionsScene}
            />
            <Route exact path={routes.privacypolicy} component={PrivacyPolicyScene} />
            <Route exact
                path = {routes.cart}
                render={() => <CartScene 
                                    {...props}
                                />}
            />
            <Route 
                path={routes.productID}
                render={ () => <ProductChosenScene
                                    {...props}
                                    onCartAddClick = {props.addToCart}
                                />}
            />
            <Route exact
                path={routes.home}
                render={() => <ProductListScene 
                                    {...props} 
                                    onCartAddClick = {props.addToCart}
                                />}
            />
            <Route path='*' component={NotFoundScene} />
        </Switch>
        {props.isModal ? 
            <Switch>
                <Route
                    exact
                    path={routes.cart}
                    render={() => (
                        <Modal {...props} >
                            <CartScene 
                                {...props}
                            />
                        </Modal>
                    )}
                />
                <Route 
                    exact
                    path={routes.productID}
                    render={ () =>
                        <Modal {...props} >
                                <ProductChosenScene
                                    {...props}
                                    onCartAddClick = {props.addToCart}
                                />
                        </Modal>}
                />
            </Switch>
            : null
        }
    </div>
);

export default withRouter(UserSceneView);