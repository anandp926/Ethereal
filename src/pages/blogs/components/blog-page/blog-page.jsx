/*
 * __author__ = 'Anand Singh <anand.ethereal@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionType from '../../../../store/actions/action-type'
import getBlogById from '../../../../services/api/get-blog-item-byid';
import emptyData from './blog-empty-data'

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

// Load some exemplary plugins:
import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

// The spacer plugin
import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

// The image plugin
import  imagePlugin  from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

// The video plugin
import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

// The parallax plugin
import parallax from 'ory-editor-plugins-parallax-background'
import 'ory-editor-plugins-parallax-background/lib/index.css'


// The native handler plugin
import native from 'ory-editor-plugins-default-native'

// The divider plugin
import divider from 'ory-editor-plugins-divider'

// Renders json state to html, can be used on server and client side
require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.



class BlogPage extends Component {  

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const id = this.props.match.params.id
        let filterBlog, filterContent;
        if(this.props.blog.length>0){
            filterBlog = this.props.blog.filter((data) => data.id === id)
            if(filterBlog){
                filterContent=filterBlog[0].content
            }
        }
       
        const content = filterContent ? JSON.parse(filterContent) : emptyData
       
        const plugins = {
            content: [slate(),spacer,imagePlugin,video,divider], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
            layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
            native
          }
          const editor = new Editor({
            plugins: plugins,
            editables: [content],
        })

        return (
        <div className="page page--blog">
            <section className="section">
                <div className="container">
                    <div className="my-editor">
                        <Editable editor={editor} id={content.id} />
                    </div>
                </div>
            </section>
        </div>
        );
    }
    }

    const mapStateToProps = (state) => {
        return{
            blog: state.blog.blogItems
        }
    }

export default connect(mapStateToProps)(BlogPage);