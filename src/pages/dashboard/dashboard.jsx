/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import getCareerEnquiry from '../../services/api/get-career-report'
import getQueriesReport from '../../services/api/get-queries-report'

import './dashboard.css';

class Dashboard extends Component {
  render() {

    const data = [
      {id: 1, value: 'Post a job / Update a job', url: '/careers'},
      {id: 2, value: 'Post a media / Update a media', url: '/media'},
      {id: 3, value: 'Post a blog / Update a blog', url:'/blogs'},
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
              <div className="dashboard-item flex-row" >
                <div className="dashboard-details-container">
                    <div className="dashboard-link">
                        <a onClick={() => getCareerEnquiry()}>Download carrers report</a>
                    </div>
                </div>
              </div>
              <div className="dashboard-item flex-row">
                <div className="dashboard-details-container">
                    <div className="dashboard-link">
                        <a onClick={() => getQueriesReport()}>Download queries report</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;