import React from 'react'
import { Provider } from 'react-redux'
import VisibleCategoriesList from '../../containers/categories'
import CategoriesList from '../../components/CategoriesList'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import sinon from 'sinon';

const createStore = () => {
  const middlewares = [];
  const initialState = {
    categories: [
      {_id:1, title:"Category 1", items: []},
      {_id:2, title:"Category 2", items: []},
      {_id:3, title:"Category 3", items: []}
    ],
    credentials: {
      token: '999'
    }
  };
  const mockStore = configureStore(middlewares);

  return mockStore(initialState);
};

describe('container VisibleCategoriesList', () => {

  const wrapper = mount(
    <Provider store={createStore()}>
      <VisibleCategoriesList />
    </Provider>
  );

  it('should map props to component and render success', () => {

    const categoryRows = wrapper.find('CategoriesRow');
    expect(categoryRows.length).toEqual(3);

  });

});
