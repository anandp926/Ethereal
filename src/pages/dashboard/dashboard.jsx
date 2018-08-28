/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './dashboard.css';

class Dashboard extends Component {
  render() {

    const data = [
      {id: 1, value: 'Post a job', url: '/careers'},
      {id: 2, value: 'Update a job', url: '/careers'},
      {id: 3, value: 'Post a media', url: '/media'},
      {id: 4, value: 'Update a media', url: '/media'},
      {id: 5, value: 'Download queries report', url:'/contact'},
      {id: 6, value: 'Download career report', url:'/careers'},
  ];

    return (
      <div className="page page--dashboard">
        <section className="section section--openings">
          <div className="container">
            <div className="dashboard-link-item">
              {
                data.map((data) => {
                  return(
                    <div className="dashboard-item flex-row" key={data.id}>
                      <div className="dashboard-details-container">
                          <div className="dashboard-link">
                              <Link to={data.url} >{data.value}</Link>
                          </div>
                      </div>
                  </div>
                  )
                })
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;