import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import { routes } from './common/routes';
import * as Api from './api/api';
import Header from './components/Header/HeaderContainer';
import Footer from './common/FooterView';
import UserScene from './components/User/UserSceneContainer';
import AdminScene from './components/Admin/AdminSceneContainer';
import LoginScene from './components/Auth/LoginScene';
import RegisterScene from './components/Auth/RegisterScene';
import Restore from './components/Auth/RestoreContainer';

const ProtectedRoute = ({
  user,
  ...props
}) => {
  console.log('user role - ',user.role)

  if (!Api.isAuthenticated()) {
    return <Redirect to = {routes.login} />
  } else {
    if (user.role === 'admin') {
      console.log('user role - ',user.role)
      return <Route {...props} />
    } else {
      return <Redirect to={routes.home} />
    }
  }
};

const App = ({
  currentUser
}) => (
    <div>
      <Header />
      <div className='App'>
        <Switch>
          <Route path={routes.login} render={() => <LoginScene /> }/>
          <Route path={routes.restore} render={() => <Restore />} /> 
          <Route path={routes.register} render={() => <RegisterScene />} /> 
          <ProtectedRoute 
            path={routes.admin}
            user={currentUser}
            render={props => <AdminScene {...props} />} />
          /> 
          <Route path={routes.home} render={props => <UserScene {...props} /> } />
        </Switch>
      </div>
      <Footer />
    </div>
);

const mapStateToProps = state => ({
  currentUser: state.app.user
});

export default withRouter(connect(mapStateToProps)(App));