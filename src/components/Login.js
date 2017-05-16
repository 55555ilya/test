import React, { Component } from 'react'
import {doLogin} from '../actions/authentication'

const SpinnerImage = ({show}) => {
  if(show) {
    return (
      <img src="/assets/loading.gif" style={{width: 32}} alt="s" />
    )
  } else { return null }
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wait_login: false,
    };
    var image = new Image();
    image.src = '/assets/loading.gif';
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  submitForm = () => {

    this.setState({ error_message: '' });
    var timer = setTimeout(() => {
      this.setState({ wait_login: true });
    }, 1000);
    this.props.dispatch(doLogin(this.usernameInput.value, this.passwordInput.value)).then(
      (err) => {
        clearTimeout(timer);
        this.setState({ error_message: err, wait_login: false });
      }
    )
  };

  render() {
    return (
      <div className="col-lg-4">
        <div className="panel panel-default">
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input className="form-control" id="inputUsername" placeholder="" ref={(input) => { this.usernameInput = input; }}/>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="" ref={(input) => { this.passwordInput = input; }} />
              </div>
              <button type="button" className="btn btn-primary" disabled={this.state.wait_login} onClick={this.submitForm}>LogIn</button>
              <SpinnerImage show={this.state.wait_login} />
            </form>
          </div>
        </div>
        {
          this.state.error_message ?
            <div className="alert alert-danger" role="alert">{this.state.error_message}</div>
            :
            null
        }
      </div>
    );
  }

}

export default Login;
