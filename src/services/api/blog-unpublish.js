import axios from '../axios/axios';
import headers from '../axios/headers';


const pubUnpubBlog = (callback, id,data) => {
    axios.patch(`/blogs/${id}/`, data,{
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

export default pubUnpubBlog;