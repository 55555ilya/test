import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware } from 'redux'
import {Router, Route, RouterContext, match} from 'react-router';
import { renderToString } from 'react-dom/server'
import cats from '../public/data/data.json'
import routes from './routes/routing';


const app = Express();
const port = 4000;

//Serve static files
app.use('/static', Express.static('./build/static'));
app.use('/data', Express.static('./build/data'));

app.use(handleRender);
app.listen(port);

function handleRender(req, res) {
  // Create a new Redux store instance
//  const store = createStore(rootReducer)

  const preloadedState = { categories: cats };

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  );

  // Render the component to a string
/*  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );*/

  // Grab the initial state from our Redux store
//  const preloadedState = store.getState()

  // Send the rendered page back to the client
//  res.send(renderFullPage(html, preloadedState))

  match( {routes, location: req.url}, ( error, redirectLocation, renderProps ) => {

    if ( error )
      return res.status(500).send( error.message );

    if ( redirectLocation )
      return res.redirect( 302, redirectLocation.pathname + redirectLocation.search );

    if ( renderProps == null ) {
      // return next('err msg: route not found'); // yield control to next middleware to handle the request
      return res.status(404).send( 'Not found' );
    }

    // console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps, false, 1, true) )
    // console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps.components, false, 3, true) )

    // this is where universal rendering happens,
    // fetchComponentData() will trigger actions listed in static "needs" props in each container component
    // and wait for all of them to complete before continuing rendering the page,
    // hence ensuring all data needed was fetched before proceeding
    //
    // renderProps: contains all necessary data, e.g: routes, router, history, components...


    fetchComponentData( store.dispatch, renderProps.components, renderProps.params)

        .then( () => {

          const initView = renderToString((
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
          ));
          // console.log('\ninitView:\n', initView);

          let state = JSON.stringify( store.getState() );
          // console.log( '\nstate: ', state )

          let page = renderFullPage( initView, state );
          // console.log( '\npage:\n', page );

          return page;

        })

        .then( page => res.status(200).send(page) )

        .catch( err => res.end(err.message) );
  })



}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <body>
        <div class="container">
          <div class="page-header">
            <h2>My Test App</h2>
          </div>
          <div id="root">${html}</div>
        </div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${preloadedState.replace(/</g, '\\u003c')}
        </script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
    `
}