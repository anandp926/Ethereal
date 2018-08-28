import axios from '../axios/axios';
import headers from  '../axios/headers'


const deleteMedia = (callback,id) => {
    axios.delete(`/medias/${id}/`,{
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

export default deleteMedia;