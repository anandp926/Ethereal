/**
 * Created by rozer on 8/14/2018.
 */

import axios from '../axios/axios';
import headers from '../axios/headers';


const pubUnpubJob = (callback, id,data) => {
    axios.patch(`careers/jobs/${id}/`, data,{
        headers:{
            ...headers,
        'Content-Type': 'application/json'
        }
    })
        .then(res => {
         //console.log(res);
        callback(res)
}).catch(err => {
        callback(err);
});
};

export default pubUnpubJob;
