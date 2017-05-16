import {setCookie} from '../utils/cookies';
import * as Navigator from '../utils/navigator';
import * as Api from '../utils/api';
import {SAVE_TOKEN, REMOVE_TOKEN} from '../constants/actionTypes';
import TOKEN_COOKIE_LIFE_LENGTH from '../constants/authentication';
import {fetchData} from './data'

export const saveToken = (token) => {
  return {
    type: SAVE_TOKEN,
    token
  }
};

export const removeToken = () => {
  return {
    type: REMOVE_TOKEN
  }
};

export const doLogin = (username, password) => {
  return dispatch => {
    return Api.login(username, password)
      .then(response => response.json())
      .then((doc) => {

        if(doc.token) {
          setCookie('token', doc.token, TOKEN_COOKIE_LIFE_LENGTH);
          dispatch(saveToken(doc.token));
          dispatch(fetchData(doc.token)).then(
            () => {
              Navigator.toRoot();
            }
          )
        } else if(doc.err) {
          return doc.err
        }

      })
      .catch((err) => {
        return 'Server is down now. Please try again over time.'
      });
  }
};

/*export const doLogOut = (dispatch) => {
  dispatch(removeToken());
  removeCookie('token');
  Navigator.toLogin();
};*/

