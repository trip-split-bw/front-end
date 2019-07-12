import axios from 'axios';
import axiosWithAuth from '../components/Login/withAuth';

export const LOGIN_START = 'LOGIN-START';
export const FETCH_TRIPS_START = 'FETCH_TRIPS_START';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const ADD_TRIP_START = 'ADD_TRIP_START';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("http://localhost:5000/api/login", creds)
    .then(res => {
      console.log(res.data.payload)
      localStorage.setItem("token", res.data.payload)
    })
    .catch(err => console.log(err))
};

export const fetchTrips = () => dispatch => {
  dispatch({ type: FETCH_TRIPS_START });
  axiosWithAuth()
    .get("http://localhost:5000/api/trips")
    .then(res => {
      dispatch({ type: FETCH_TRIPS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      if (err.response.status === 403) {
        localStorage.removeItem("token");
      }
    });
};

export const addTrips = trip => dispatch => {
  dispatch({ type: ADD_TRIP_START });
  axiosWithAuth()
    .post("http://localhost:5000/api/trips", trip)
    .then(res => {
      dispatch({ type: ADD_TRIP_SUCCESS, payload: res.data });
    });
};