import React from 'react';
import { connect } from 'react-redux';

import { fetchTrips } from '../actions';

import Trip from './Trip';

class MainApp extends React.Component {

  componentDidMount() {
    this.props.fetchTrips();
  }

  addTripHandler = e => {
    e.preventDefault();
    this.props.addTrips();
  }

  render() {
    return (
      <div>
        <header>

        </header>
        <div>
          {this.props.trips.map(trip => (
            <Trip trip={trip} />
          ))}
          <footer>
            <form onSubmit={this.addTripHandler}>
              <button type="submit">Add Trip</button>
            </form>
          </footer>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  trips: state.trips
})

export default connect(
  mapStateToProps,
  { fetchTrips }
)(MainApp);