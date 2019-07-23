import axiosWithAuth from '../components/Login/withAuth';

export const UPDATE_TRIP_START = 'UPDATE_TRIP_START';
export const UPDATE_TRIP_SUCCESS = 'UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_FAILED = 'UPDATE_TRIP_FAILED';

export const updateTrip = trip => dispatch => {
  dispatch({ type: UPDATE_TRIP_START });
  axiosWithAuth()
    .put(`http://localhost:5000/api/trips/${trip.id}/`, trip)
    .then(res => {
      dispatch({ 
        type: UPDATE_TRIP_SUCCESS, 
        payload: res.data 
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_TRIP_FAILED,
        payload: err.response
      })
    })
};