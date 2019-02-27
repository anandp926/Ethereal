/**
 * Created by rozer on 8/16/2018.
 */
import axios from 'axios';

const loginInstance = axios.create({
    baseURL: 'https://api2.etherealmachines.com'
});

const loginUser = (callback, data) => {
    loginInstance.post(`/auth/jwt/create/`, data, {
        headers: {
            'Content-Type': 'application/json'
        },
        crossdomain: true
    })
        .then((res) => { callback(res) })
        .catch(err => callback(err))
}

export default loginUser
