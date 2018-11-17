import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import './App.css';
import { routes } from './common/routes';
import * as Api from './api/api';
import Header from './common/header';
import Footer from './common/footer';
import UserScene from './components/User/UserScene';
import AdminScene from './components/Admin/AdminScene';
import AuthScene from './components/Auth/AuthScene';

function ProtectedRoute(props) {
  if (!Api.isAuthenticated()) {
    return (
      <Redirect to = {{
          pathname: `${routes.auth}`,
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
        <Link to={routes.home}>
          Home - 
        </Link>
        <Link to={routes.admin}>
          - Admin
        </Link>
        <Switch>
          <Route path={routes.auth} render={() => <AuthScene /> }/>
          <ProtectedRoute path={routes.admin} render={props => <AdminScene {...props} /> } />
          <Route path={routes.home} render={props => <UserScene {...props} /> } />
        </Switch>
      </div>
      <Footer />
    </div>
)

export default withRouter(App);