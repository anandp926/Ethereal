import  axios  from '../axios/axios';
import headers from '../axios/headers';

const getBlogItems = (callback) => {
    axios.get(`/blogs/`, {headers, crossdomain: true })
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