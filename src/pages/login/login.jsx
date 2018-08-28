/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';
import LoginForm from './component/login-form/login-form'

class Login extends Component {
  render() {
    return (
      <div className="page page--login">
        <section className="section flex-row">
          <div className="container">
           <LoginForm history={this.props.history}/>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
