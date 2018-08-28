import React, { Component } from 'react'
import ErrorBox from '../../../../components/pages-component/form/components/error-box'
import Loader from '../../../../components/ui/loader/loader'
import '../../../../components/pages-component/button/button.css'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control'
import {connect} from 'react-redux'
import loginUser from '../../../../services/api/login'
import * as actionType from '../../../../store/actions/action-type'
import * as utilityFunctions from '../../../../utility-functions/utility-functions';


class LoginForm extends Component{

    state = {
        username: '',
        password: '',
        errorMsg: null,
        formSubmissionStart: false,
    };

    onSubmitLogin = (e) => {
        e.preventDefault()
    };

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    loginCallback = (data) => {
        if(data.status === 200){
            sessionStorage.setItem('jwt', data.data.token);
            this.props.loginUser()
            this.props.history.push("/");
            utilityFunctions.clearSelectField('.select-input');
            this.setState({
                ...this.state,
                errorMsg: null,
                formSubmissionStart: false
            });
        }else if (data.response) {
            this.setState({
                ...this.state,
                errorMsg: data.response.data,
                formSubmissionStart: false
            });
        }else {
        const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
        this.setState({
            ...this.state,
            errorMsg: genericErrorMsg,
            formSubmissionStart: false
        });
    }
    };
    
    logedIn = () => {
        const data = {
            username:this.state.username,
            password: this.state.password
        };
        loginUser(this.loginCallback,data);
    };

    render(){
        return(
            <form onSubmit={this.onSubmitLogin}>
                <FormControl>
                    <label htmlFor="username">
                        Username
                        <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter the username"
                        className="input-element"
                        id="username"
                        required={true}
                        value={this.state.username}
                        onChange={ e => this.handleInputChange(e)}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="password">
                        Password
                        <span className="star">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter the password"
                        className="input-element"
                        id="password"
                        required={true}
                        value={this.state.password}
                        onChange={ e => this.handleInputChange(e)}
                    />
                </FormControl>
                { this.state.errorMsg ? <ErrorBox isRequired errorMsg={this.state.errorMsg} /> : null}
                { this.state.formSubmissionStart ? <Loader>Submitting your request...</Loader> : null }
                <button className="form-btn" onClick={this.logedIn}>Login</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loginUser: () =>{
            dispatch({
                type: actionType.LOGIN,
            })
        }
    }

}

export default connect(null, mapDispatchToProps)(LoginForm)
