import React from 'react';

import '../form-success-msg/form-success-msg.css';

import icon from './success-icon.svg';
import attention from  './attention-icon.svg'

const msg = (props) => {
  return (
    <div className="form-success-msg flex-column">
      <img src={props.attention ? attention :icon} alt="Done" width="60" height="60"/>
      <p className="main-text u-text-center">{props.msg}!</p>
    </div>
  );
};

export default msg;