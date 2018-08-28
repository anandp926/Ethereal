/**
 * Created by Anand Singh on 8/14/2018.
 */

import axios from '../axios/axios';
import headers from  '../axios/headers'


const deleteJob = (callback,id) => {
    axios.delete(`careers/jobs/${id}/`,{
        headers:{
            ...headers,
        'Content-Type': 'application/json'
    }
})
.then(res => {
        //console.log(res);
        callback(res)
    })
.catch(err => callback(err))
};

export default deleteJob;
