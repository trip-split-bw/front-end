import React from 'react';
import { connect } from 'react-redux';
import { fetchTrips, addTrip } from '../actions';

import './MainApp.css';

import Trip from './Trip';

class MainApp extends React.Component {
  state = {
    tripForm: false,
    riders: [],
    trip: {
      ride_fare: ''
    },
    rider: {
      name: '',
      phone_number: ''
    },
    updateRider: {
      name: '',
      phone_number: ''
    }
  }

  componentDidMount() {
    this.props.fetchTrips();
  }

  addTripHandler = e => {
    e.preventDefault();
    const id = localStorage.getItem('user')

    const trip = {
      primary_member_id: Number(id),
      ride_fare: Number(this.state.trip.ride_fare),
      riders: JSON.stringify(this.state.riders.map(rider => ({
        name: rider.name,
        phone_number: rider.phone_number
      })))
    }
    console.log(trip)

    this.props.addTrip(trip);
  }

  changeHandler = (e, type) => {
    type === 'ride_fare' ?
      this.setState({
        trip: {
          ...this.state.creds,
          [e.target.name]: e.target.value
        }
      })
    : 
      this.setState({
        rider: {
          ...this.state.rider,
          [e.target.name]: e.target.value
        }
      })
  }

  updateChangeHandler = e => {
    this.setState({
      updateRider: {
        ...this.state.updateRider,
        [e.target.name]: e.target.value
      }
    })
  }

  formAnimation = open => ({
    marginTop: open ? '0' : '1000px',
    transition: 'margin-top 1000ms ease-out'
  })

  addRider = e => {
    e.preventDefault();
    this.setState({
      riders: [
        ...this.state.riders,
        {
          name: this.state.rider.name,
          phone_number: this.state.rider.phone_number,
          update: false
        }
      ],
      rider: {
        name: '',
        phone_number: ''
      }
    })
  }

  editRider = name => {
    this.setState({
      riders: this.state.riders.map(rider => {
        if(rider.name === name) {
          rider.update = true
        }
        return rider
      })
    })
  }

  confirmUpdate = (e, index) => {
    e.preventDefault();
    const newRiders = this.state.riders.map((rider, i) => {
      if(index === i) {
        rider = {
          name: this.state.updateRider.name === '' ? rider.name : this.state.updateRider.name,
          phone_number: this.state.updateRider.phone_number === '' ? rider.phone_number : this.state.updateRider.phone_number
        }
      }
      return rider
    })

    this.setState({
      riders: newRiders,
      updateRider: {
        name: '',
        phone_number: ''
      }
    })
  }

  openForm = e => {
    e.preventDefault()
    this.setState({
      tripForm: true
    })
  }

  render() {
    return (
      <div className="main-app">
        <div className="trips">
          {this.props.trips.length > 0 ?
            this.props.trips.map(trip => (
              <Trip trip={trip} />
            ))
          :
            <p>No trips found.</p>
          }
        </div>
        <div
          style = { this.formAnimation(this.state.tripForm) }
          className="fullLayout"
        >
          <form 
            onSubmit = { this.state.tripForm ? e => this.addTripHandler(e) : e => this.openForm(e) }
            style = {{ marginBottom: '20px' }}
          >
            <span className="currency">
              <input 
                className="input"
                type="number"
                value = { this.state.trip.ride_fare }
                name="ride_fare"
                placeholder="Total Fare"
                onChange = { e => this.changeHandler(e, 'ride_fare') }
              />
          </span>
            <button 
              className="addTripBtn"
            >
              { this.state.tripForm ? "Confirm" : "Add Trip" }
            </button>
          </form>
          <h1 className="heading">Riders:</h1>
          { this.state.riders.length > 0 ?
            this.state.riders.map((rider, i) => (
              rider.update ?
                <form 
                  className="riderLayout"
                  onSubmit = { e => this.confirmUpdate(e, i) }
                >
                  <input 
                    className="riderInput"
                    type="text"
                    placeholder = { `${rider.name}` }
                    name="name"
                    value = { this.state.updateRider.name }
                    onChange = { this.updateChangeHandler }
                  />
                  <input 
                    className="riderInput"
                    type="text"
                    placeholder = { `${rider.phone_number}` }
                    name="phone_number"
                    value = { this.state.updateRider.phone_number }
                    onChange = { this.updateChangeHandler }
                  />
                  <input 
                    type="submit"
                    className="hiddenSubmit"
                    value="Confirm"
                  />
                </form>
              :
                <div className="riderLayout">
                  <div style={{display:'flex', alignItems: 'center', height: '50px'}}>
                    <span className="heading">{i + 1}.&nbsp;&nbsp;</span>
                    <p className="heading">{ rider.name }</p>
                  </div>
                  <p className="heading">{ rider.phone_number }</p>
                  <button 
                    onClick = { () => this.editRider(rider.name)}
                    className="editBtn"
                  >
                    edit
                  </button>
                </div>
              ))
            :
              <h1 style={{color: 'black' }}>No riders listed, add some</h1>
          }
          <form 
            className="riderLayout"
            onSubmit = { this.addRider }
            style = {{
              position: 'absolute',
              width: '450px',
              bottom: '75px',
              opacity: this.state.tripForm ? 1 : 0,
              transition: 'opacity 1s ease-in 750ms'
            }}
          >
            <input 
              className="riderInput"
              type="text"
              placeholder="Name"
              name="name"
              value = { this.state.rider.name }
              onChange = { e => this.changeHandler(e, 'rider') }
            />
            <input 
              className="riderInput"
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value = { this.state.rider.phone_number }
              onChange = { e => this.changeHandler(e, 'rider') }
            />
            <button className="input">
              Add Rider
            </button>
          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  trips: state.tripReducer.trips
})

export default connect(
  mapStateToProps,
  { fetchTrips, addTrip }
)(MainApp);