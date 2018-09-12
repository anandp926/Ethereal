/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React from 'react';
import { Link } from 'react-router-dom';

//import calendarIcon from '../../../../assets/images/calendar-icon.svg';

import './blog-item.css';

const blogItem = (props) => {
  return (
    <div className="blog-item">
      <div className="blog-img-container">
        <img src={props.imgUrl} alt="Blog Item" width="400" height="300"/>
      </div>
      <div className="blog-details-container">
        <div className="blog-title subtitle">
          <span>{props.title}</span>
        </div>
        {/* <div className="blog-date flex-row">
          <img src={calendarIcon} alt="Calender" width="16" height="16" className="icon"/>
          <span>Published On:</span>
          <span>{props.date}</span>
        </div> */}
        <div className="blog-link">
        {
          props.session
          ?
          <ul className="display-list">
            <li>
            <Link to={`blogs/blog/${props.id}`}>Read More</Link>
            
            </li>
            <li>
                <Link to={`blogs/create/content/${props.id}`}>Update</Link>
            </li>
            <li>
              {
                  props.publish
                  ?
                      <a onClick={() => props.unpublishBlog(props.id,false)} >UnPublish</a>
                  :
                      <a onClick={() => props.publishBlog(props.id,true)} >Publish</a>
              }
            </li>
            <li>
              <a onClick={() => props.deleteBlog(props.id)}>Delete</a>
            </li>
          </ul>
          :
          <Link to={`blogs/blog/${props.id}`}>Read More</Link>
        }
        </div>
      </div>
    </div>
  );
};

export default blogItem;