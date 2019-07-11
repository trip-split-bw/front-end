import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    creds: {
      number: '',
      password: '',
    }
  }

  handleChange = e => {
    this.setState({ creds: {
      ...this.state.creds,
      [e.target.name]: e.target.value
    } });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.creds)
  }
      
  render = () => {
    const { number, password } = this.state.creds;

    return (
      <div>
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
    )
  }
}
