import * as Api from '../utils/api';
import * as actions from '../constants/actionTypes';

export const addCategorySuccess = (category_id, text) => {
  return {
    type: actions.ADD_CATEGORY,
    category_id,
    text
  }
};

export const removeCategorySuccess = (category_id) => {
  return {
    type: actions.REMOVE_CATEGORY,
    category_id
  }
};

export const updateCategorySuccess = (category_id, text) => {
  return {
    type: actions.UPDATE_CATEGORY,
    category_id,
    text
  }
};

export const addCategory = (text) => {
  return (dispatch, getState) => {
    return Api.addCategory(text, getState().credentials.token)
      .then(response => response.json())
      .then(json => dispatch(addCategorySuccess(json._id, json.title)))
      .catch((err) => {
        return {err: 'Server is down now. Please try again over time.'}
      });
  }
};

export const removeCategory = (category_id) => {
  return (dispatch, getState) => {
    return Api.removeCategory(category_id, getState().credentials.token)
      .then(dispatch(removeCategorySuccess(category_id)))
      .catch((err) => {
        return {err: 'Server is down now. Please try again over time.'}
      });
  }
};

export const updateCategory = (category_id, title) => {
  return (dispatch, getState) => {
    return Api.updateCategory(category_id, title, getState().credentials.token)
      .then(response => response.json())
      .then(json => dispatch(updateCategorySuccess(category_id, title)))
      .catch((err) => {
        return {err: 'Server is down now. Please try again over time.'}
      });
  }
};

