import * as actions from '../../actions/categories'
import * as types from '../../constants/actionTypes'
import * as viewConstants from '../../constants/view'
import * as apiConstants from '../../constants/api'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'



const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('category actions', () => {
  it('should create an action to add a category', () => {
    const text = 'New category';
    const category_id = 888;
    const expectedAction = {
      type: types.ADD_CATEGORY,
      category_id,
      text
    };
    expect(actions.addCategorySuccess(category_id, text)).toEqual(expectedAction)
  });

  it('should create an action to remove a category', () => {
    const category_id = 10;
    const expectedAction = {
      type: types.REMOVE_CATEGORY,
      category_id,
    };
    expect(actions.removeCategorySuccess(category_id)).toEqual(expectedAction)
  });

  it('should create an action to update a category', () => {
    const text = 'Update category';
    const category_id = 10;
    const expectedAction = {
      type: types.UPDATE_CATEGORY,
      category_id,
      text
    };
    expect(actions.updateCategorySuccess(category_id, text)).toEqual(expectedAction)
  })

});

describe('category async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  let title = 'New category';
  let id = 888;
  let token = '####token#####';

  it('creates ADD_CATEGORY_SUCCESS when request to API has been done', () => {
    nock(apiConstants.API_BASE_URL)
      .post('/categories')
      .reply(200, { _id: id, title: title });

    const expectedActions = [
      { type: types.ADD_CATEGORY, category_id: id, text: title }
    ];
    const store = mockStore({ categories: [], credentials: {token: token} });

    return store.dispatch(actions.addCategory(title))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('get error message when request to API for adding category is failed', () => {
    nock(apiConstants.API_BASE_URL)
      .post('/categories')
      .replyWithError('Error');

    const store = mockStore({ categories: [], credentials: {token: token} });

    return store.dispatch(actions.addCategory(title))
      .then((doc) => { // return of async actions
        expect(doc.err).toEqual(viewConstants.MESSAGE_CONNECTION_ERROR)
      })
  });

  it('creates REMOVE_CATEGORY_SUCCESS when request to API has been done', () => {
    nock(apiConstants.API_BASE_URL)
      .delete('/categories/'+id)
      .reply(200, { });

    const expectedActions = [
      { type: types.REMOVE_CATEGORY, category_id: id }
    ];
    const store = mockStore({ categories: [], credentials: {token: token} });

    return store.dispatch(actions.removeCategory(id))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('get error message when request to API for removing category is failed', () => {
    nock(apiConstants.API_BASE_URL)
      .delete('/categories/'+id)
      .replyWithError('Error');

    const store = mockStore({ categories: [], credentials: {token: token} });

    return store.dispatch(actions.removeCategory(title))
      .then((doc) => { // return of async actions
        expect(doc.err).toEqual(viewConstants.MESSAGE_CONNECTION_ERROR)
      })
  });

  it('creates UPDATE_CATEGORY_SUCCESS when request to API has been done', () => {
    nock(apiConstants.API_BASE_URL)
      .put('/categories/'+id)
      .reply(200, { });

    const expectedActions = [
      { type: types.UPDATE_CATEGORY, category_id: id, text: title }
    ];
    const store = mockStore({ categories: [], credentials: {token: token} });

    return store.dispatch(actions.updateCategory(id, title))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get error message when request to API for updating category is failed', () => {
    nock(apiConstants.API_BASE_URL)
      .put('/categories/'+id)
      .replyWithError('Error');

    const store = mockStore({ categories: [], credentials: {token: token} });

    return store.dispatch(actions.updateCategory(title))
      .then((doc) => { // return of async actions
        expect(doc.err).toEqual(viewConstants.MESSAGE_CONNECTION_ERROR)
      })
  });


});