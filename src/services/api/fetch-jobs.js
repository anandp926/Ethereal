/**
 * Created by rozer on 8/13/2018.
 */
import  axios  from '../axios/axios';
import headers from '../axios/headers';

const getJobs = (callback) => {
    axios.get(`/careers/jobs/`, { headers })
            .then((res) => {callback(res)})
            .catch(err => {
                callback({
                  status: 'error',
                  data: err
                });
              });
};

export default getJobs

  