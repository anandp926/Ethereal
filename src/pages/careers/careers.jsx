/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';

import './careers.css';

import PageBanner from '../../components/ui/page-banner/page-banner';
import SectionHeading from '../../components/pages-component/section-heading/section-heading';
import CareersGenericForm from './components/careers-generic-form/careers-generic-form';
import Modal from '../../components/ui/modal/modal';
import FormSuccessMsg from '../../components/pages-component/form-success-msg/form-success-msg'
import ShowMsg from '../../components/pages-component/showMSG/msg'
import postJobEnquiry from '../../services/api/post-job-enquiry';
import getJobs from '../../services/api/fetch-jobs'
import pubUnpubJobs from '../../services/api/publish-unpublish-job'
import deleteJob from '../../services/api/delete-job'
import { connect } from 'react-redux'

import * as utilityFunctions from '../../utility-functions/utility-functions';
import '../../components/pages-component/button/button.css'
import CreateCareer from './components/create-careers/careers-form'
import * as actionType from '../../store/actions/action-type';
import Career from './components/career/career'
import getCareerEnqReport from '../../services/api/get-career-report'



class Careers extends Component {
  constructor(props) {
    super(props);

    this.formData = new FormData();
    this.fileSize = null;
  }

  state = {
    formValid: false,
    errorMsg: null,
    formSubmissionStart: false,
    showModal: false,
    createCareer: false,
    updateCareer: false,
    careerId:'',
    msg:false,
    msgContent:'',
    attention:false
  };

  onGetJob = (data) => {
    if (data.status === 'error') {
      data.data.response ? console.log(data.data.response) : console.log(data.data);
    } else {
      this.props.getJobs(data.data);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    getJobs(this.onGetJob)
  }

  
  onClearningFormData = () => {
    this.formData.delete('name');
    this.formData.delete('contact_number');
    this.formData.delete('email');
    // this.formData.delete('gender');
    this.formData.delete('position');
    this.formData.delete('resume');
    this.formData.delete('message');
  }

  resetProperties = () => {
    this.fileSize = null;
  }

  onSubmitCallBack = (data) => {
    if (data.status === 201) {
      document.querySelector(".form--careers-generic-form").reset();
      this.onClearningFormData();
      this.resetProperties();
      utilityFunctions.clearSelectField('.select-input');
      this.setState({
        ...this.state,
        showModal: true,
        formValid: true,
        errorMsg: null,
        formSubmissionStart: false
      });
    } else {
      if (data.response) {
        this.setState({
          ...this.state,
          formValid: false,
          errorMsg: data.response.data,
          formSubmissionStart: false
        });
      } else {
        const fileErrorMsg = { Resume: ["Max. limit for resume 5 MB"] };
        const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
        this.setState({
          ...this.state,
          formValid: false,
          errorMsg: this.fileSize > 5 ? fileErrorMsg : genericErrorMsg,
          formSubmissionStart: false
        });
      }
    }
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      formSubmissionStart: true
    });

    postJobEnquiry(this.onSubmitCallBack, this.formData);
  }

  onInputChange = (event) => {
    const inputFieldName = event.target.name;
    // console.log(inputFieldName);
    switch (event.target.type) {
      case 'text':
        if (inputFieldName === 'name') {
          this.formData.append('name', event.target.value);
        } else if (inputFieldName === 'contact_number') {
          const contactNo = event.target.value;
          this.formData.append('contact_number', contactNo);
        }else if(inputFieldName === 'resume'){
          this.formData.append('resume',event.target.value)
        }
        break;
      
      case 'email':
        if (inputFieldName === 'email') {
          this.formData.append('email', event.target.value);
        }
        break;
      
      case 'select-one':
        if (inputFieldName === 'gender') {
          if (event.target.value === 'Male') {
            this.formData.append('gender', 'M');
          } else {
            this.formData.append('gender', 'F');
          }
        } else if (inputFieldName === 'position') {
          this.formData.append('position', event.target.value);
        }
        break;

      case 'textarea':
        this.formData.append('message', event.target.value);
        break;

      default:
        break;
    }

    this.setState({
      ...this.state,
      formData: this.formData,
    });
  }

  createCareerModal = () =>{
    this.setState({
      showModal:true,
      createCareer:true
    })
  }
  updateCareer = (id) => {
    this.setState({
      showModal: true,
      careerId: id,
      updateCareer: true
    });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false,
      createCareer:false,
      updateCareer:false,
      careerId: '',
      attention: false,
      msg:false,
      msgContent:'',
      formValid:false
    });
  };

  unPublishCallback = (data) => {
    if(data.status === 200){
      this.setState({
        msg:true,
        msgContent: 'Successfully Changed',
        showModal: true,
        attention:false
      })
    }else{
      this.setState({
        msg:true,
        msgContent: "Something went wrong",
        showModal: true,
        attention:true
      })
    }
  };
  
  publishJob = (id) => {
    const data = {
      id: id,
      publish: true
    }
    pubUnpubJobs(this.unPublishCallback,id,{publish:true})
    this.props.pubunpubJob(data)
  };
  unpublishJob = (id) => {
    const data = {
      id: id,
      publish: false
    }
    pubUnpubJobs(this.unPublishCallback,id,{publish:false})
    this.props.pubunpubJob(data)
  };
  deleteJobCallback = (data) => {
    if(data.status === 204){
      this.setState({
        msg:true,
        msgContent: 'Successfully Deleted',
        showModal: true,
        attention: false
      })
    }else{
      console.log(data)
      this.setState({
        msg:true,
        msgContent: 'Something Went Wrong',
        showModal: true,
        attention: true
      })
    }
  };
  deleteJob = (id) => {
    deleteJob(this.deleteJobCallback,id)
    this.props.deleteJob(id)
  };

  getJobEnqReport = () => {
    getCareerEnqReport()
  }
  
  render() {
    let flag =0,noJob=0;
    if(this.props.careerJobs) {
      flag=1
      if(this.props.careerJobs.length < 1){
        noJob = 1
      }
    }
    return (
      <React.Fragment>
        {this.state.createCareer || this.state.updateCareer
          ?
            <Modal show={this.state.showModal} clicked={this.closeModal}>
              <CreateCareer closeModal={this.closeModal} careerId={this.state.careerId} updateCareer={this.state.updateCareer}/>
            </Modal>
          :
            null
        }
        {
          this.state.formValid
          ?
          <Modal show={this.state.showModal} clicked={this.closeModal}>
              <FormSuccessMsg />
          </Modal>
          : null
        }
        {
          this.state.msg
          ?
          <Modal show={this.state.showModal} clicked={this.closeModal}>
            <ShowMsg msg={this.state.msgContent} attention={this.state.attention}/>
          </Modal>
          : null
        }
        <div className="page page--careers">
          <PageBanner heading={"Careers in Ethereal Machines"} subHeading={"Make your dream job come true"} classValue={"page-banner--careers"} />
          <section className="section section--openings">
            <div className="container">
              {
                this.props.session.session
                ?
                    <div>
                      <button className="form-btn" onClick={this.createCareerModal}>Post a Job</button>
                      <button className="form-btn" onClick={this.getJobEnqReport}>Job Enquiry Report</button>
                    </div>
                    
                :
                    null
              }
              <SectionHeading classValue={'u-margin-bottom-big u-text-center'} name={'Current Openings in Ethereal Machines'} />
              {
                flag === 1
                    ?
                    <div className="current-openings">
                      {
                        this.props.careerJobs.map((data) => {
                          return(
                              <Career 
                                  jobItems={data} key={data.id} 
                                  updateCareer={this.updateCareer} 
                                  publishJob={this.publishJob} 
                                  unpublishJob={this.unpublishJob}
                                  deleteJob = {this.deleteJob}
                                  session = {this.props.session.session}
                              />
                          )
                        })
                      }
                    </div>
                    : null
              }
              {
                noJob === 1
                ?
                  <div className="no-openings">
                    <p className="u-text-center">Sorry, we have no current openings.</p>
                  </div>
                : null
              }
            </div>
          </section>
          <section className="section section--careers-form">
            <div className="container">
              <SectionHeading name={"Get in touch!"} classValue={"u-margin-bottom-big u-text-center"} hasSubHeading={true} subHeading={"Let's schedule an interview!"}/>
              <CareersGenericForm onInputChange={this.onInputChange} onSubmitHandler={this.onSubmitHandler} formSubmissionStart={this.state.formSubmissionStart} errorMsg={this.state.errorMsg} showLoader={this.state.formSubmissionStart}/>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    careerJobs: state.jobs.jobItems,
    session: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: (data) => {
      dispatch({
        type: actionType.FETCH_JOB,
        value: data
      });
    },
    pubunpubJob: (data) => {
      dispatch({
        type: actionType.UNPUBLISHED_JOB,
        value: data
      });
    },
    deleteJob: (data) => {
      dispatch({
        type: actionType.DELETE_JOB,
        value: data
      });
    },
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Careers);
