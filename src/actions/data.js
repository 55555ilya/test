import * as Api from '../utils/api';
import {FETCH_DATA} from '../constants/actionTypes';

export const fetchDataSuccess = (json) => {
  return {
    type: FETCH_DATA,
    data: json,
    receivedAt: Date.now()
  }
};

export const fetchData = () => {
  return (dispatch, getState) => {
    return Api.fetchData(getState().credentials.token)
      .then(response => response.json())
      .then(json => {
          return dispatch(fetchDataSuccess(json))
        }
      )
  }
};