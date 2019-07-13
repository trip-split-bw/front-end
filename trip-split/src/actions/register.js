import axios from 'axios';

export const REGISTER_START = 'REGISTER-START';
export const REGISTER_SUCCESS = 'REGISTER-SUCCESS';
export const REGISTER_FAILED = 'REGISTER-FAILED';

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START });
  return axios
    .post('http://localhost:5000/api/register', creds)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.token)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: REGISTER_FAILED,
        payload: 'FAILED'
      })
    })
};