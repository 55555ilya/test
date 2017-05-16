import React from 'react'
import PropTypes  from 'prop-types'
import { shallow } from 'enzyme'
import CategoriesList from '../../components/CategoriesList'
import sinon from 'sinon';


function setup() {
  const props = {
    categories: [
      {_id:1, title:"Category 1", items: []},
      {_id:2, title:"Category 2", items: []},
      {_id:3, title:"Category 3", items: []}
    ]
  };

  const wrapper = shallow(<CategoriesList {...props} />);

  return {
    props,
    wrapper
  }
}

describe('component CategoriesList', () => {

  const { wrapper } = setup();

  it('should render self and subcomponents', () => {

    expect(wrapper.find('ErrorMessageBox').exists()).toEqual(true);

    expect(wrapper.find('Pagination').exists()).toEqual(true);

    expect(wrapper.find('CategoriesRow').exists()).toEqual(true);

    const categoryRows = wrapper.find('CategoriesRow');
    expect(categoryRows.length).toEqual(3);

    const categoryRowProps = categoryRows.first().props();
    expect(categoryRowProps.category).toEqual({_id:1, title:"Category 1", items: []});
    expect(categoryRowProps.onChange).toBeDefined();
    expect(categoryRowProps.onDelete).toBeDefined();

    const newCategoryInputProps = wrapper.find('NewCategoryTextInput').props();
    expect(newCategoryInputProps.onSubmit).toBeDefined();
    expect(newCategoryInputProps.placeholder).toEqual('new category...')

  });

  it('click to LogOut button calls onLogOut', () => {
    const onLogOut = sinon.spy();
    wrapper.setProps({onLogOut: onLogOut});
    wrapper.find('#logOutButton').simulate('click');
    expect(onLogOut.calledOnce).toEqual(true);
  })


});