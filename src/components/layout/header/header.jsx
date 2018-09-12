import React, {Component} from 'react';

import './header.css';

import Logo from '../logo/logo';
import NavBar from '../nav-bar/nav-bar';
import Hamburger from './hamburger/hamburger';

import logoWhite from '../../../assets/images/logo/logo-white.svg';
import { connect } from 'react-redux';
import * as actionType from '../../../store/actions/action-type'

class Header extends Component{
  state = {
    openNavBar: false
  };

  /* This function will toggle the nav-bar (close/open) */
  toggleNavBar = () => {
    if (this.state.openNavBar) {
      this.setState({
        ...this.state,
        openNavBar: false
      });
    } else {
      this.setState({
        ...this.state,
        openNavBar: true
      });
    }
  }

  /* This function will be called whenever a nav-link will be clicked */
  closeNavBar = () => {
    // console.log('closeNavBar is called');
    this.setState({
      openNavBar: false,
    });
  }

  logOut = () => {
    this.props.logout()
    // this.setState({
    //   openNavBar: false,
    // });
  }
  render(){
    if(this.props.blog === true){
      return null
    }else{
      return(
      <header className="header">
        <div className="container flex-row header-container">
          <Hamburger 
            clicked={this.toggleNavBar} 
            openNavBar={this.state.openNavBar} 
          />
          <Logo url={logoWhite} width={40} height={40} id={"header-logo"}/>
          <NavBar 
            clicked={this.toggleNavBar} 
            openNavBar={this.state.openNavBar} 
            closeNavBar={this.closeNavBar} 
            closeSubList={this.state.closeSubList}
            session = {this.props.session.session}
            logout = {this.logOut}
          />
        </div>
      </header>
    )
    }
  }
}

const mapStateToProps = (state) => {
  return{
    session: state.login,
    blog: state.blog.contentOpen
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    logout: () =>{
      sessionStorage.removeItem('jwt')
      dispatch({
        type:actionType.LOGOUT
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps, null, {pure:false})(Header);