import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import './App.css';
import { routes } from './common/routes';
import * as Api from './api/api';
import Header from './components/Header/HeaderContainer';
import Footer from './common/FooterView';
import UserScene from './components/User/UserSceneContainer';
import AdminScene from './components/Admin/AdminSceneContainer';
import LoginScene from './components/Auth/LoginScene';
import RegisterScene from './components/Auth/RegisterScene';
import RestoreView from './common/RestoreView';

function ProtectedRoute(props) {
  if (!Api.isAuthenticated()) {
    return (
      <Redirect to = {{
          pathname: `${routes.login}`,
          state: { modal: true }
        }}
      />
    )
  }
  return (
    <Route {...props} />
  )
}

const App = () => (
    <div>
      <Header />
      <div className='App'>
        <Link to={routes.admin}>
          Admin
        </Link>
        <Switch>
          <Route path={routes.login} render={() => <LoginScene /> }/>
          <Route path={routes.restore} render={() => <RestoreView /> }/>
          <Route path={routes.register} render={() => <RegisterScene /> }/>
          <ProtectedRoute path={routes.admin} render={props => <AdminScene {...props} /> } />
          <Route path={routes.home} render={props => <UserScene {...props} /> } />
        </Switch>
      </div>
      <Footer />
    </div>
)

export default withRouter(App);