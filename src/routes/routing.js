import React from 'react'
import { Route } from 'react-router'
import NotFound from '../components/NotFound.js';
import VisibleCategoriesList from '../containers/categories.js';
import VisibleItemsList from '../containers/items.js';
import LoginContainer from '../containers/login.js';
import App from '../components/App.js';

export default (

  <Route component={App}>
      <Route path="/" components={{main: VisibleCategoriesList}} />
      <Route path="category/:id" components={{main: VisibleItemsList}} />
      <Route path="login" components={{main: LoginContainer}} />
      <Route path="*" components={{main: NotFound}} />
  </Route>

)