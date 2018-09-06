
/**
 * Created by Anand Singh on 8/30/2018.
 */
import  axios  from '../axios/axios';
import headers from '../axios/headers';

const updateblog = (callback,id,data) => {
    axios.patch(`/blogs/${id}/`,data, {
            headers: {
                ...headers,
            'Content-Type': 'application/json'
        }
}).then(res => {
    // console.log(res)
        callback(res)
    })
.catch(err => {
    callback(err)
})
};

export default updateblog
