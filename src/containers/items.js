import { connect } from 'react-redux'
import ItemsList from '../components/ItemsList'

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    credentials: state.credentials
  }
};

const VisibleItemsList = connect(
  mapStateToProps
)(ItemsList);

export default VisibleItemsList