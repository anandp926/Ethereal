import  axios  from '../axios/axios';
import headers from '../axios/headers';

const getBlogById = (callback,id) => {
    axios.get(`/blogs/${id}`, { headers })
            .then((res) => {
                callback(res)
            })
            .catch(err => {
                callback({
                  status: 'Not Found',
                  data: err
                });
              });
};

export default getBlogById