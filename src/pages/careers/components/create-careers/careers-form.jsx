import React, { Component } from 'react'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control'
import '../../../../components/pages-component/button/button.css'
import postJob from '../../../../services/api/post-job'
import updateJob from '../../../../services/api/update-post-job'
import { connect } from 'react-redux'
import * as actionType from '../../../../store/actions/action-type';
import * as utilityFunctions from '../../../../utility-functions/utility-functions';
import ErrorBox from '../../../../components/pages-component/form/components/error-box'
import Loader from '../../../../components/ui/loader/loader'
import './career-form.css'
import TextEditor from '../../../text-editor/textEditor';
import  uuid  from 'uuid/'


class CreateCareer extends Component{
    
    state = {
        position:'',
        description:'',
        publish: false,
        formValid: true,
        errorMsg: null,
        id: uuid(),
        formSubmissionStart: false,
    };

    componentDidMount(){
        const { careerId, jobItems } = this.props;
        if(careerId){
            const filterJobs = Object.values(jobItems)[1].filter((data) => data.id === this.props.careerId)
            this.setState({
                position: filterJobs[0].position,
                description: filterJobs[0].description,
                publish: filterJobs[0].publish,
                id:filterJobs[0].id
            })
        }
    }
    
    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });   
    }
    handleInputChangedesc = (data) => {
        this.setState({description: data})
    }
    submitJob = (e) =>{
        e.preventDefault();
        this.setState({
            ...this.state,
            formSubmissionStart: true
        });
        const data = this.createJob()
        if(this.props.updateCareer){
            updateJob(this.submitCallBack,this.state.id, data)
        }else{
            if(data){
                postJob(this.submitCallBack,data)
            }
        }
    };

    submitCallBack = (data) => {
        let code =201,careerData = this.createJob()
        if(this.props.updateCareer){
            code = 200
        }
        if (data.status === code) {
            this.clearForm()
            this.props.closeModal()
            utilityFunctions.clearSelectField('.select-input');
            if(this.props.updateCareer){
                this.props.onUpdateCareer(careerData)
            }else{
                this.props.createCareer(careerData)
            }
            this.setState({
                ...this.state,
                formValid: true,
                errorMsg: null,
                formSubmissionStart: false
            });
        }else if (data.response) {
                this.setState({
                    ...this.state,
                    formValid: false,
                    errorMsg: data.response.data,
                    formSubmissionStart: false
                });
            }else {
            const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
            this.setState({
                ...this.state,
                formValid: false,
                errorMsg: genericErrorMsg,
                formSubmissionStart: false
            });
        }
    }
    
    createJob = () => {
        const { position, description, publish,id} = this.state
        const careerData = {
            position: position,
            description: description,
            publish: publish,
            id: id
        };
        return careerData
    };

    clearForm = () => {
        this.setState({
            position: '',
            description: '',
            publish: false,
            id:''
        })
    };

    render(){
        return(
            <form onSubmit={this.submitJob}>
                <FormControl>
                    <label htmlFor="position">
                        Position
                        <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        name="position"
                        placeholder="Enter Position"
                        className="input-element"
                        id="position"
                        onChange={ e => this.handleInputChange(e)}
                        value={this.state.position}
                    />
                </FormControl>
                <label htmlFor="description">
                    <b>Description</b>
                    <span className="star">*</span>
                </label>
                <TextEditor
                    placeholder="Enter the description"
                    id="description"
                    required={true}
                    onChangeTextEditor={this.handleInputChangedesc}
                    value={this.state.description}
                />
                <div style={{margin:5}}>
                <input
                    type="checkbox"
                    name="publish"
                    id="publish"
                    onChange={ e => this.handleInputChange(e)}
                    checked={this.state.publish}
                />{" "}<span><b>Publish</b></span>
                </div>
                { this.state.errorMsg ? <ErrorBox isRequired errorMsg={this.state.errorMsg} /> : null}
                { this.state.formSubmissionStart ? <Loader>Submitting your request...</Loader> : null }
                <button 
                    type="submit" 
                    className="form-btn" 
                    
                    disabled={this.state.formSubmissionStart}
                >
                    Submit
                </button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        jobItems: state.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCareer: (data) => {
            dispatch({
                type: actionType.CREATE_JOB,
                value: data
            });
        },
        onUpdateCareer: (data) => {
            dispatch({
                type: actionType.UPDATE_JOB,
                value: data
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCareer)
