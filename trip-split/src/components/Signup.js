import React from 'react';
import { connect } from 'react-redux';

class Signup extends React.Component {
  state = {
    name: '',
    number: '',
    moneyApp: ''
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input 
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Name"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="number"
            value={this.state.number}
            placeholder="Phone Number"
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="moneyApp"
            value={this.state.moneyApp}
            placeholder="Money App Link"
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;