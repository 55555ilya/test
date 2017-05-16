import {categories} from '../../reducers/categories'
import * as types from '../../constants/actionTypes'

describe('categories reducer', () => {
  it('should return the initial state', () => {
    expect(
      categories(undefined, {})
    ).toEqual([])
  });

  let category_id = 888;
  let category_title = 'Category name';

  let item_id = 999;
  let item_title = 'Item name';

  it('should handle ADD_CATEGORY', () => {
    expect(
      categories([], {
        type: types.ADD_CATEGORY,
        category_id: category_id,
        text: category_title
      })
    ).toEqual(
      [
        {
          _id: category_id,
          title: category_title,
          items: []
        }
      ]
    )
  });

  it('should handle REMOVE_CATEGORY', () => {
    expect(
      categories([
        {_id: 888, title: 'Category', items:[]}
      ], {
        type: types.REMOVE_CATEGORY,
        category_id: category_id
      })
    ).toEqual([])
  });

  it('should handle UPDATE_CATEGORY', () => {
    expect(
      categories([
        {_id: 888, title: 'Category', items:[]}
      ], {
        type: types.UPDATE_CATEGORY,
        category_id: category_id,
        text: category_title
      })
    ).toEqual([
      {_id: 888, title: category_title, items:[]}
    ])
  });

  it('should handle ADD_ITEM', () => {
    expect(
      categories([
        {_id: 888, title: category_title, items:[]}
      ], {
        type: types.ADD_ITEM,
        category_id: category_id,
        item_id: item_id,
        text: item_title
      })
    ).toEqual([
      {_id: 888, title: category_title, items:[{_id: item_id, title: item_title}]}
    ])
  });

  it('should handle REMOVE_ITEM', () => {
    expect(
      categories([
        {_id: 888, title: category_title, items:[{_id: item_id, title: item_title}]}
      ], {
        type: types.REMOVE_ITEM,
        category_id: category_id,
        item_id: item_id
      })
    ).toEqual([
      {_id: 888, title: category_title, items:[]}
    ])
  });

  it('should handle UPDATE_ITEM', () => {
    expect(
      categories([
        {_id: 888, title: category_title, items:[{_id: item_id, title: 'Old item name'}]}
      ], {
        type: types.UPDATE_ITEM,
        category_id: category_id,
        item_id: item_id,
        text: 'New item name'
      })
    ).toEqual([
      {_id: 888, title: category_title, items:[{_id: item_id, title: 'New item name'}]}
    ])
  });

});
