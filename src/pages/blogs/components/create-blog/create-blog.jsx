import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from '../../../../components/pages-component/form/form'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control';
import './create-blog.css'
import '../../../../components/pages-component/button/button.css'

class CreateBlog extends Component{

    state = {
        editContent: false
    }

    render(){
        return(
            <div className="page page--blogs-page">
                <section className="section section--blogs">
                    <div className="container">
                        <div className="create-blog-form">
                            <Form>
                                <FormControl>
                                    <label>
                                        Author
                                        <span className="star"> *</span>
                                    </label>
                                    <input type="text" className="input-element" placeholder="Enter Author Name"/>
                                </FormControl>
                                <FormControl>
                                    <label>
                                        Title
                                        <span className="star"> *</span>
                                    </label>
                                    <input type="text" className="input-element" placeholder="Enter Blog's Title"/>
                                </FormControl>
                                <FormControl>
                                    <label>
                                        Thumbnail
                                        <span className="star"> *</span>
                                    </label>
                                    <input type="text" className="input-element" placeholder="Enter Image URL"/>
                                </FormControl>
                                <div style={{margin:5}}>
                                    <input
                                        type="checkbox"
                                        name="publish"
                                        id="publish"
                                    />{" "}<span><b>Publish</b></span>
                                </div>
                                <button className="form-btn">Save</button>
                            </Form>
                            <Link to="/blogs/create/content/id">
                                <button className="form-btn">Edit Content</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default CreateBlog