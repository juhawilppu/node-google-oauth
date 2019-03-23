import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return (dispatch : any) => {
        const request = axios.get('/api/current_user')
        .then((response : any) => dispatch({
            type: FETCH_USER,
            payload: response
        }))
    }
}