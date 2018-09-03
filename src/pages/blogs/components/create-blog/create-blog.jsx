import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Form from '../../../../components/pages-component/form/form'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control';
import './create-blog.css'
import '../../../../components/pages-component/button/button.css'
import Button from '../../../../components/pages-component/button/button'
import uuid from 'uuid/';
import createBlog from '../../../../services/api/create-blog'
import ErrorBox from '../../../../components/pages-component/form/components/error-box';
import Loader from '../../../../components/ui/loader/loader';
import * as actionType from '../../../../store/actions/action-type'

class CreateBlog extends Component{

    state = {
        id: uuid(),
        author: '',
        title: '',
        thumbnail: '',
        publish: false,
        editContent: false,
        formSubmissionStart: false,
        readOnly: false,
        errorMsg: null,
        btnDisable: false,
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

    submitCallback = (data) => {
        const blogData = this.createBlogData();
        if(data.status === 201){
            this.props.addBlogItems(blogData)
            this.setState({
                editContent: true,
                readOnly:true,
                errorMsg: null,
                formSubmissionStart: false,
            })
        }else if (data.response) {
            this.setState({
                ...this.state,
                errorMsg: data.response.data,
                formSubmissionStart: false,
                editContent: false,
                readOnly: false,
                btnDisable: false
            });
        }else {
        const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
        this.setState({
            ...this.state,
            errorMsg: genericErrorMsg,
            formSubmissionStart: false,
            editContent: false,
            readOnly: false,
            btnDisable: false
        });
    }
    }

    onSubmitHandle = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            formSubmissionStart: true,
            btnDisable: true
          });
        const data = this.createBlogData();
        if(data){
            createBlog(this.submitCallback, data)
        }
        
    }

    createBlogData = () => {
        const { id, author, title, publish, thumbnail } = this.state
        const data = {
            id: id,
            author: author,
            title: title,
            thumbnail: thumbnail,
            publish: publish
        }
        return data
    }

    clearForm = () => {
        this.setState({
            author: '',
            title: '',
            thumbnail: '',
            publish: false
        })
    }

    render(){
        return(
            <div className="page page--blogs-page">
                <section className="section section--blogs">
                    <div className="container">
                        <div className="create-blog-form">
                            <Form classValue="form" onSubmitHandler={this.onSubmitHandle}>
                                <FormControl>
                                    <label htmlFor="author">
                                        Author
                                        <span className="star"> *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input-element" 
                                        placeholder="Enter Author Name"
                                        name="author"
                                        id="author"
                                        required={true}
                                        readOnly={this.state.readOnly}
                                        value={this.state.author}
                                        onChange={ e => this.handleInputChange(e)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <label htmlFor="title">
                                        Title
                                        <span className="star"> *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input-element" 
                                        placeholder="Enter Blog's Title"
                                        name="title"
                                        id="title"
                                        required={true}
                                        readOnly={this.state.readOnly}
                                        value={this.state.title}
                                        onChange={ e => this.handleInputChange(e)}
                                    />
                                </FormControl>
                                <FormControl>
                                    <label htmlFor="thumbnail">
                                        Thumbnail
                                        <span className="star"> *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input-element" 
                                        placeholder="Enter Image URL"
                                        name="thumbnail"
                                        id="thumbnail"
                                        required={true}
                                        readOnly={this.state.readOnly}
                                        value={this.state.thumbnail}
                                        onChange={ e => this.handleInputChange(e)}
                                    />
                                </FormControl>
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
                                <Button 
                                    type="submit" 
                                    classValue="form-btn" 
                                    disabled={this.state.btnDisable}
                                >
                                    Create
                                </Button>
                            </Form>
                            {
                                this.state.editContent
                                ?
                                <Link to={`/blogs/create/content/${this.state.id}`}>
                                    <button className="form-btn" >Edit Content</button>
                                </Link>
                                : null
                            }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addBlogItems: (data) => {
            dispatch({
                type: actionType.ADD_BLOG_ITEM,
                value: data
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(CreateBlog)