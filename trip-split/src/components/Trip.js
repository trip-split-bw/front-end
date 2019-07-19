import React, { Component } from 'react';
import './Trip.css';

class Trip extends Component{
  state = {
    ride_fare: 0,
    riders: [],
    editTrip: false,
    confirmBtn: false,
    id: null
  }

  componentDidMount() {
    let { ride_fare, riders, id } = this.props.trip;
    riders = JSON.parse(riders)

    this.setState({
      ride_fare: ride_fare,
      riders: riders,
      id: id
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  editRider = index => {
    const riders = this.state.riders.map((rider, i) => {
      if(i === index) {
        rider.paid = !rider.paid
      }
      return rider;
    })

    this.setState({ riders: riders })
    this.updateTrip(null, false)
  }

  updateTrip = (e, form) => {
    if(form) {
      e.preventDefault();
    }  
    
    const id = localStorage.getItem('user');

    const trip = {
      id: this.props.id,
      primary_member_id: Number(id),
      ride_fare: Number(this.state.ride_fare),
      riders: JSON.stringify(this.state.riders)
    }

    this.props.update(trip)
    this.setState({ editTrip: false })
  }

  delete = id => {
    this.props.delete(id);
    window.location.reload();
  }

  render() {
    return (
      <div className="tripCard">
        <div className="deleteTrip">
          <span onClick = { () => this.delete(this.state.id) }>
            <i className="fal fa-trash-alt"></i>
          </span>
        </div>
        { this.state.editTrip ? 
          <form 
            onSubmit = { e => this.updateTrip(e, true) }
          >
            <span className="currency">
              <input 
                className="input"
                style={{ width: '200px' }}
                type="number"
                value = { this.state.ride_fare }
                name="ride_fare"
                onChange = { this.handleChange }
              />
              <input 
                type="submit"
                className="hiddenSubmit"
              />
            </span>
          </form>
        :
          <p 
            className="fare"
            onClick = { () => this.setState({ editTrip: true })}
          >
            Trip Total: ${this.state.ride_fare}
          </p>
        }
        <div className="riderList">
          {this.state.riders.map((rider, i) => (
            <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60px' }}>
              <div 
                className="riderIcon"
                onClick = { () => this.editRider(i) }
              >
              <i 
                className="fas fa-user-circle"
                style = {{ fontSize: '3rem' }}
              ></i>
                { rider.paid ? 
                  <div 
                    className="riderIconOverlay"
                  >
                    ✓
                  </div>
                : 
                  null
                }
              </div>
              <span>{ rider.name }</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

export default Trip;