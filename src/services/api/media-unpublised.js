import axios from '../axios/axios';
import headers from '../axios/headers';


const pubUnpubMedia = (callback, id,data) => {
    axios.patch(`/medias/${id}/`, data,{
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

export default pubUnpubMedia;