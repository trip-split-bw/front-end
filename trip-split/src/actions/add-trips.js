import axiosWithAuth from '../components/Login/withAuth';

export const ADD_TRIP_START = 'ADD_TRIP_START';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_FAILED = 'ADD_TRIP_FAILED';

export const addTrip = trip => dispatch => {
  dispatch({ type: ADD_TRIP_START });
  axiosWithAuth()
    .post("https://localhost:5000/api/trips", trip)
    .then(res => {
      dispatch({ 
        type: ADD_TRIP_SUCCESS, 
        payload: res.data 
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_TRIP_FAILED,
        payload: err.response
      })
    })
};