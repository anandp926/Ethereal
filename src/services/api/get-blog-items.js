import  axios  from '../axios/axios';
import headers from '../axios/headers';

const getBlogItems = (callback,id) => {
    axios.get(`/blogs/`, { headers })
            .then((res) => {
                callback(res)
            })
            .catch(err => {
                callback({
                  status: 'error',
                  data: err
                });
              });
};

export default getBlogItems