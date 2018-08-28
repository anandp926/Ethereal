import axios from '../axios/axios';
import headers from '../axios/headers';

const getQueryReport = () => {
  axios.get('/queries/report/',{headers:{
    ...headers,
    'Content-Disposition': 'attachment; filename="Query.xlsx"',
    'Content-Type': 'application/ms-excel',
  },
  responseType:'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'queries-report.xlsx');
    document.body.appendChild(link);
    link.click();
  });
  
};

export default getQueryReport;