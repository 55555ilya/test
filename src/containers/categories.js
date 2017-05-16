import { connect } from 'react-redux'
import CategoriesList from '../components/CategoriesList'

import * as Navigator from '../utils/navigator';
import * as auth_actions from '../actions/authentication'



const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    credentials: state.credentials
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => {
      dispatch(auth_actions.removeToken());
      Navigator.toLogin();
    },
    dispatch: dispatch
  }
};

const VisibleCategoriesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList);

export default VisibleCategoriesList;