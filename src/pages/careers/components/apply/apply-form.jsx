import React, { Component } from 'react';
import FormControl from '../../../../components/pages-component/form-controls/components/form-control';
import Form from '../../../../components/pages-component/form/form'
import Button from '../../../../components/pages-component/button/button'
import ErrorBox from '../../../../components/pages-component/form/components/error-box';
import Loader from '../../../../components/ui/loader/loader';
import * as utilityFunctions from '../../../../utility-functions/utility-functions'
import postJobEnquiry from '../../../../services/api/post-job-enquiry'
import Modal from '../../../../components/ui/modal/modal';
import FormSuccessMsg from '../../../../components/pages-component/form-success-msg/form-success-msg';

class ApplyForm extends Component{

    state = {
        name: '',
        email: '',
        contact_number: '',
        resume: '',
        message: '',
        errorMsg: null,
        formSubmissionStart: false,
        showModal: false
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitCallBack = (data) => {
        if (data.status === 201) {
            this.clearForm()
            utilityFunctions.clearSelectField('.select-input');
            this.setState({
                ...this.state,
                errorMsg: null,
                formSubmissionStart: false,
                showModal: true
            });
        }else if (data.response) {
                this.setState({
                    ...this.state,
                    errorMsg: data.response.data,
                    formSubmissionStart: false,
                    showModal: false
                });
            }else {
            const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
            this.setState({
                ...this.state,
                errorMsg: genericErrorMsg,
                formSubmissionStart: false,
                showModal: false
            });
        }
    }

    onSubmitHandle = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            formSubmissionStart: true
          });
        const data = this.formData()
        if(data){
            postJobEnquiry(this.submitCallBack, data)
        }
    }

    formData = () => {
        if(this.props.position){
            const {name, email, contact_number, resume, message } = this.state
            const data = {
                name: name,
                email: email,
                contact_number: contact_number,
                resume: resume,
                message: message,
                position: this.props.position
            }
            return data
        }
    }
    clearForm = () => {
        this.setState({
            name: '',
            email: '',
            contact_number: '',
            resume: '',
            message: ''
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
        this.props.openForm()
    }

    render(){
        return(
            <div>
                <Modal show={this.state.showModal} clicked={this.closeModal}>
                    <FormSuccessMsg />
                </Modal>
                <Form classValue="form form--careers-generic-form" onSubmitHandler={this.onSubmitHandle}>
                    <div className="form-controls three-col-layout">
                        <FormControl>
                            <label htmlFor="name">
                                Name
                                <span className="star">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                className="input-element"
                                id="name"
                                required={true}
                                value={this.state.name}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <label htmlFor="email">
                                Email
                                <span className="star">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                className="input-element"
                                id="email"
                                required={true}
                                value={this.state.email}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <label htmlFor="contact_number">
                                Contact Number
                                <span className="star">*</span>
                            </label>
                            <input
                                type="text"
                                name="contact_number"
                                placeholder="Contact No. with Country code (e.g. +91XXXXXXXXXX)"
                                className="input-element"
                                id="contact_number"
                                required={true}
                                value={this.state.contact_number}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <label htmlFor="resume">
                                Resume
                                <span className="star">*</span>
                            </label>
                            <input
                                type="text"
                                name="resume"
                                placeholder="Enter Resume Link"
                                className="input-element"
                                id="resume"
                                required={true}
                                value={this.state.resume}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </FormControl>
                        <FormControl>
                            <label htmlFor="message">
                            Message
                            <span className="star">*</span>
                            </label>
                            <textarea
                            type="textarea"
                            name="message"
                            placeholder="Leave Your Message..."
                            className="input-element"
                            id="message"
                            value={this.state.message}
                            onChange={(e) => this.handleInputChange(e)}
                            />
                        </FormControl>
                    </div>
                    { this.state.errorMsg ? <ErrorBox isRequired errorMsg={this.state.errorMsg} /> : null}
                    { this.state.formSubmissionStart ? <Loader>Submitting your request...</Loader> : null }
                    <Button 
                        type="submit" 
                        classValue="form-btn" 
                        disabled={this.state.formSubmissionStart}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default ApplyForm