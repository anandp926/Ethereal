/*
 * __author__ = 'Anand Singh <anand.ethereal@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionType from '../../../../../store/actions/action-type'
import getBlogById from '../../../../../services/api/get-blog-item-byid';

import { HTMLRenderer } from 'ory-editor-renderer'

import slate from 'ory-editor-plugins-slate'
import 'ory-editor-plugins-slate/lib/index.css'

import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

import parallax from 'ory-editor-plugins-parallax-background'
import 'ory-editor-plugins-parallax-background/lib/index.css'

import native from 'ory-editor-plugins-default-native'

import divider from 'ory-editor-plugins-divider'


const plugins = {
  content: [slate(), spacer, image, video, divider,], 
  layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
  native
}


class BlogPage extends Component {
  
    state = {
        errorMsg: null,
        contents: ''
    }
    callback = (data) => {
        if(data.status === 200){
            this.props.fetchBlogItemsById(data.data)
            this.setState({
                errorMsg: ''
            })
        }else {
            this.setState({
                errorMsg: data['status']
            })
        }
    }  

    componentDidMount() {
        window.scrollTo(0, 0);
        const id = this.props.match.params.id
        if(id){
            getBlogById(this.callback,id)
        }
        
    }

    // replaceParagraphType = () => {
    //     const jsonString = localStorage.getItem('user')
    //     const search = '"type":"paragraph"';
    //     const replacement = '"type":"PARAGRAPH/PARAGRAPH"';
    //     const newContent = jsonString.replace(new RegExp(search, 'g'), replacement);
    //     return newContent;
    //   }
    
      componentWillMount() {
       // var user = this.replaceParagraphType()
        
        //console.log(localStorage.getItem('user'))
      }

    render() {
        let content
        if(this.props.blog.content){
           content  = JSON.parse(this.props.blog.content)
           //console.log(this.props.blog.content)
        }
        
        return (
        <div className="page page--blog">
            <section className="section">
            <div className="container">
            {
                content
                ? <HTMLRenderer state={content} plugins={plugins}/>
                : null  
            }
            
            </div>
            </section>
        </div>
        );
    }
    }

    const mapStateToProps = (state) => {
        return{
            blog: state.blog.blogItemsById
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return{
            fetchBlogItemsById: (data) => {
                dispatch({
                    type: actionType.BLOG_ITEM_BY_ID,
                    value: data
                })
            }
        }
    }

export default connect(mapStateToProps,mapDispatchToProps)(BlogPage);