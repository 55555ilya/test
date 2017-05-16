import React, { Component } from 'react'
import { Link } from 'react-router'
import Pagination from "../components/Pagination";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

import {addCategory, updateCategory, removeCategory} from '../actions/categories'
import * as viewConstants from '../constants/view.js'

class CategoryEdit extends Component {

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" defaultValue={this.props.text} ref={(input) => { this.nameInput = input; }} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={() => this.props.onSave(this.nameInput.value)}>save</button>
          <button className="btn btn-default" type="button" onClick={this.props.onCancel}>cancel</button>
        </span>
      </div>
    )
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  }
}


class CategoriesRow extends Component {

  constructor(props) {
    super(props);
    this.state = {edit_mode: false};
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row vertical-align">
          <div className="col-lg-6">
            {
              this.state.edit_mode ?
                <CategoryEdit text={this.props.category.title} onSave={ this.handleChange.bind(null,this.props.category._id) } onCancel={ this.cancelEdit }/>
                :
                <Link to={'/category/'+this.props.category._id} className="row-padding">
                    { this.props.category.title }
                </Link>
            }
          </div>
          <div className="col-lg-1">
            <span className="badge">{ this.props.category.items.length }</span>
          </div>
          <div className="col-lg-5">
            <div className="btn-group btn-group pull-right" role="group">
              <button type="button" className="btn btn-default" onClick={this.handleEdit} disabled={this.state.edit_mode}>
                edit
              </button>
              <button type="button" className="btn btn-default" onClick={this.props.onDelete.bind(null,this.props.category._id)}>
                delete
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }

  handleEdit = (e) => {
    this.setState({edit_mode: true});
  };

  cancelEdit = () => {
    this.setState({edit_mode: false});
  };

  handleChange = (category_id,title) => {
    this.setState({edit_mode: false});
    this.props.onChange(category_id,title);
  };

}

export const ErrorMessageBox = (props) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="example2"
      transitionEnter={true}
      transitionEnterTimeout={500}
      transitionLeave={true}
      transitionLeaveTimeout={500}
      >
      {
        props.error_message && <div className="alert alert-danger toast" role="alert">{props.error_message}</div>
      }
    </ReactCSSTransitionGroup>
  )
};

class NewCategoryTextInput extends Component {

  clearInput() {
    this.nameInput.value = '';
  }

  render() {
    return (
      <form>
        <div className="col-lg-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder={this.props.placeholder} onChange={this.props.handleChange} ref={(input) => { this.nameInput = input; }} />
            <span className="input-group-btn">
             <button className="btn btn-default" type="button" onClick={() => this.props.onSubmit(this.nameInput.value)}>add</button>
          </span>
          </div>
        </div>
      </form>
    )
  }
}

class CategoriesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      web_data: 0
    };
  };

  goLastPage = () => {
    this.setState({activePage: this.getLastPageNumber()});
  };

  getLastPageNumber = () => Math.ceil(this.props.categories.length/6);

  handleSubmit = (new_category) => {
    this.props.dispatch(addCategory(new_category)).then((doc) => {
      if(doc.err === undefined) {
//        this.nameInput.value = '';
        this.nameInput.clearInput();
        this.goLastPage();
      } else {
        this.showErrorBox(doc.err)
      }
    })
  };

  showErrorBox = (message) => {
    this.setState({error_message: message});
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        this.setState({error_message: undefined});
        this.timer = undefined;
      },
      viewConstants.MESSAGE_BOX_SHOW_TIME*1000
    );
  };

  changeCategory = (category_id, title) => {
    this.props.dispatch(updateCategory(category_id, title));
  };

  handleDelete = (category_id) => {
    this.props.dispatch(removeCategory(category_id)).then(() => {
      if(this.state.activePage > this.getLastPageNumber()) this.goLastPage()
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  };

/*  handleData = (data) => {      // just test for websocket
    let result = JSON.parse(data);
    this.setState({web_data: result.num});
  };*/

  render() {
    return (

      <div>
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <form className="navbar-form navbar-right">
                <div className="row">
                  <button className="btn btn-default" id="logOutButton" onClick={this.props.onLogOut}>LogOut</button>
                  <span className="badge left-padding">{this.state.web_data}</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ErrorMessageBox error_message={this.state.error_message} />

        <div className="panel panel-default">
          <div className="panel-heading">Categories</div>
          <div className="panel-body">
            <ul className="list-group">
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnter={false}
                transitionEnterTimeout={500}
                transitionLeave={false}>
              {
                this.props.categories
                .filter(
                  (item, index) => (((index / 6) >= this.state.activePage-1) && ((index / 6) < this.state.activePage))
                ).map(
                  (item, index) => (<CategoriesRow key={index} category={item} onChange={this.changeCategory} onDelete={this.handleDelete}/>)
                )
              }
              </ReactCSSTransitionGroup>
            </ul>

            <NewCategoryTextInput onSubmit={this.handleSubmit} placeholder='new category...' ref={(input) => { this.nameInput = input; }} />

          </div>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={viewConstants.ITEMS_COUNT_PER_PAGE}
          totalItemsCount={this.props.categories.length}
          pageRangeDisplayed={viewConstants.PAGE_RANGE_DISPLAYED}
          onChange={this.handlePageChange}
        />

      </div>
    );
  }

}

export default CategoriesList;

//        <Websocket url='ws://localhost/ws' onMessage={this.handleData}/>
