/*
 * __author__ = 'Anand Singh <anand.ethereal@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import axios from '../axios/axios';
import headers from '../axios/headers';

const getGallary = (callback) => {
  axios.get('/gallary/',{headers})
    .then(res => {
      //console.log(res);
      callback(res);
    })
    .catch(err => {
      callback({
        status: 'error',
        data: err
      });
    });
};

export default getGallary;