import * as Api from '../utils/api';
import * as actions from '../constants/actionTypes';

export const addItemSuccess = (category_id, item_id, text) => {
  return {
    type: actions.ADD_ITEM,
    category_id,
    item_id,
    text
  }
};

export const removeItemSuccess = (category_id, item_id) => {
  return {
    type: actions.REMOVE_ITEM,
    category_id,
    item_id
  }
};

export const updateItemSuccess = (category_id, item_id, text) => {
  return {
    type: actions.UPDATE_ITEM,
    category_id,
    item_id,
    text
  }
};

export const addItem = (category_id, text) => {
  return (dispatch, getState) => {
    return Api.addItem(category_id, text, getState().credentials.token)
      .then(response => response.json())
      .then(json => dispatch(addItemSuccess(category_id, json._id, json.title)))
  }
};

export const removeItem = (category_id, item_id) => {
  return (dispatch, getState) => {
    return Api.removeItem(category_id, item_id, getState().credentials.token)
      .then(dispatch(removeItemSuccess(category_id, item_id)));
  }
};

export const updateItem = (category_id, item_id, title) => {
  return (dispatch, getState) => {
    return Api.updateItem(category_id, item_id, title, getState().credentials.token)
      .then(response => response.json())
      .then(json => dispatch(updateItemSuccess(category_id, item_id, title)))
  }
};


