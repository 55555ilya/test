import React, { Component } from 'react'
import * as actions from '../actions/items'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ItemEdit extends Component {

  componentDidMount(){
    this.nameInput.focus();
  }

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" defaultValue={this.props.text} ref={(input) => { this.nameInput = input; }} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={ () => this.props.onSave(this.nameInput.value) }>save</button>
          <button className="btn btn-default" type="button" onClick={this.props.onCancel}>cancel</button>
        </span>
      </div>
    )
  }
}

class ItemRow extends Component {

  constructor(props) {
    super(props);
    this.state = {edit_mode: false};
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row vertical-align">
          <div className="col-lg-7">
            {
              this.state.edit_mode ?
                <ItemEdit text={this.props.item.title} onSave={(s) => this.handleChange(this.props.item._id, s)} onCancel={this.cancelEdit}/>
                :
                <span className="row-padding">
                  { this.props.item.title }
                </span>
            }
          </div>
          <div className="col-lg-5">
            <div className="btn-group btn-group pull-right" role="group">
              <button type="button" className="btn btn-default" onClick={this.handleEdit} disabled={this.state.edit_mode}>
                edit
              </button>
              <button type="button" className="btn btn-default" onClick={() => this.props.onDelete(this.props.item._id)}>
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

  handleChange = (item_id, title) => {
    this.props.onChange(item_id, title).then(() => {
      this.setState({edit_mode: false});
    });
  };

}

class ItemsList extends Component {

  handleSubmit = () => {
    this.props.dispatch(actions.addItem(this.props.params.id, this.newInput.value, this.props.credentials));
    this.newInput.value = '';
  };

  category = ()  => {
    return this.props.categories.find((category) => (this.props.params.id === category._id))
  };

  changeItem = (item_id, title) => {
    return this.props.dispatch(actions.updateItem(this.props.params.id, item_id, title, this.props.credentials));
  };

  handleDelete = (item_id) => {
    this.props.dispatch(actions.removeItem(this.props.params.id, item_id, this.props.credentials))
  };

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Items of category "{this.category().title}"</div>
          <div className="panel-body">
            <ul className="list-group">
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={3000}>
                  {
                    this.category().items.map(
                      (item, index) => (
                        <ItemRow item={item} key={index} onChange={this.changeItem} onDelete={this.handleDelete} />
                      )
                    )
                  }
              </ReactCSSTransitionGroup>
            </ul>
            <form>
              <div className="col-lg-6">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="new item..." ref={(input) => (this.newInput = input)} />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={() => { this.handleSubmit(this.newInput.value) }}>add</button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <p><a className="btn btn-primary btn-lg" href="#" role="button">back to Categories</a></p>
      </div>
    );
  }

}

export default ItemsList;
