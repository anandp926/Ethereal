import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from '../../../../components/pages-component/form/form'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control';
import './create-blog.css'
import '../../../../components/pages-component/button/button.css'
import Button from '../../../../components/pages-component/button/button'

class CreateBlog extends Component{

    state = {
        editContent: false,
        formSubmissionStart: false,
        readOnly: false
    }

    onSubmitHandle = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            formSubmissionStart: true,
            editContent: true,
            readOnly:true
          });
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
                                    />
                                </FormControl>
                                <div style={{margin:5}}>
                                    <input
                                        type="checkbox"
                                        name="publish"
                                        id="publish"
                                    />{" "}<span><b>Publish</b></span>
                                </div>
                                <Button 
                                    type="submit" 
                                    classValue="form-btn" 
                                    disabled={this.state.formSubmissionStart}
                                >
                                    Create
                                </Button>
                            </Form>
                            {
                                this.state.editContent
                                ?
                                <Link to="/blogs/create/content/id">
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

export default CreateBlog