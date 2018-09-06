/**
 * Created by Anand Singh on 9/4/2018.
 */
import  axios  from '../axios/axios';
import headers from '../axios/headers';

const uploadImage = (callback,data) => {
    axios.post(`/gallary/`,data, {
            headers: {
                ...headers,
            'Content-Type': 'application/json'
        }
}).then(res => {
     //console.log(res)
        callback(res)
    })
.catch(err => {
    callback(err)
})
};

export default uploadImage