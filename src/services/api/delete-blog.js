/**
 * Created by Anand Singh on 8/14/2018.
 */

import axios from '../axios/axios';
import headers from  '../axios/headers'


const deleteBlog = (callback,id) => {
    axios.delete(`/blogs/${id}/`,{
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

export default deleteBlog;