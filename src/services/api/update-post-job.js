/**
 * Created by Anand Singh on 8/14/2018.
 */
import  axios  from '../axios/axios';
import headers from '../axios/headers';

const updateJob = (callback,id,data) => {
    axios.put(`/careers/jobs/${id}/`,data, {
            headers: {
                ...headers,
            'Content-Type': 'application/json'
        }
}).then(res => {
        callback(res)
    })
.catch(err => callback(err))
};

export default updateJob
