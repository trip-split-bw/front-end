import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

import './Login.css';

class Login extends Component {
  state = {
    creds: {
      number: '',
      password: '',
    }
  }

  handleChange = e => {
    this.setState({ 
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      } 
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props
      .login(this.state.creds)
      .then(() => {
        this.props.history.push("/trip-split")
      });
  }
      
  render = () => {
    const { number, password } = this.state.creds;

    return (
      <div className="loginPage">
        <div className="loginImg">
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text"
              value = { number }
              placeholder="Phone Number"
              name="number"
              onChange={this.handleChange}
            />
            <input 
              type="password"
              value = { password }
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, { login })(Login)