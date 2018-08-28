import  axios  from '../axios/axios';
import headers from '../axios/headers';

const getJob = (callback,id) => {
    axios.get(`/careers/jobs/${id}`, { headers })
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

export default getJob