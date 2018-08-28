/**
 * Created by Anand Singh on 8/17/2018.
 */
import  axios  from '../axios/axios';
import headers from '../axios/headers';

const updateMedia = (callback,id,data) => {
    axios.put(`/medias/${id}/`,data, {
            headers: {
                ...headers,
            'Content-Type': 'application/json'
        }
}).then(res => {
        callback(res)
    })
.catch(err => callback(err))
};

export default updateMedia