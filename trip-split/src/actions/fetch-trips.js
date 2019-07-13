import axiosWithAuth from '../components/Login/withAuth';

export const FETCH_TRIPS_START = 'FETCH_TRIPS_START';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILED = 'FETCH_TRIPS_FAILED';

export const fetchTrips = () => dispatch => {
  dispatch({ type: FETCH_TRIPS_START });
  axiosWithAuth()
    .get("https://localhost:5000/api/trips")
    .then(res => {
      dispatch({ 
        type: FETCH_TRIPS_SUCCESS, 
        payload: res.data 
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_TRIPS_FAILED,
        payload: err.response
      })
    })
};