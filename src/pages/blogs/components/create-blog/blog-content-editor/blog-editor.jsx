import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as actionType from '../../../../../store/actions/action-type'

import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css' 

import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

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

import FloatingButton from './floating-button/floating-button'
import updateBolg from '../../../../../services/api/update-blog'
import getBlogItemsByID from '../../../../../services/api/get-blog-item-byid'
import ErrorPage from '../../../../error-page/error-page'

// Creates an empty editable
const content = createEmptyState();

const plugins = {
    content: [slate(), spacer, image, video, divider], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
    // If you pass the native key the editor will be able to handle native drag and drop events (such as links, text, etc).
    // The native plugin will then be responsible to properly display the data which was dropped onto the editor.
    layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
    native,
  } ;

const editor = new Editor({
    defaultPlugin: slate(),
    plugins: plugins,
    editables: [content],
  });

editor.trigger.mode.edit()

class BlogEditor extends Component{


    state = {
        description: "",
        errorMsg: null
    }

    componentWillMount(){
        this.props.contentEditorOpen(true)
    }

    callback = (data) => {
        if(data.status === 200){
            this.props.contentEditorOpen(true)
            this.props.fetchBlogItemsById(data.data)
            
            this.setState({
                errorMsg: ''
            })
            
        }else {
            this.props.contentEditorOpen(false)
            this.setState({
                errorMsg: data['status']
            })
        }
    }
  
    componentDidMount() {

        const id = this.props.match.params.id
        if(id){
            getBlogItemsByID(this.callback,id)
        }
        

        this.unblock = this.props.history.block(targetLocation => {
        
        var cnfrm= window.confirm("You will loss your data");
        if (cnfrm == true) {
            this.props.contentEditorOpen(false) 
            return this.props.history.goBack('/blogs')
        } else {
            return false
        }
        });
     }
     componentWillUnmount() {
        this.unblock();
     }


     blogcallback = (data) => {
        const contentData = {
            content: JSON.stringify(this.state.description)
         }
        if(data.status === 200){
            this.props.updateBlogItems(contentData)
            return this.props.history.goBack('/blogs/blog/this.props.match.params.id')
        }else if (data.response) {
            alert(data.response.data.content)
          } else {
            const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
            alert(genericErrorMsg)
          }
     }

     updateContent = () => {
         const data = {
            content: JSON.stringify(this.state.description)
         }
         const id = this.props.match.params.id
         if(id){
             updateBolg(this.blogcallback,id ,data)
         }
         
     }

    render(){
        
        if(this.state.errorMsg !== null && this.state.errorMsg === 'Not Found'){
            return(
                <ErrorPage/>
            )
        }else{
            return(
            <div>
                <FloatingButton onUpdate={this.updateContent}/>
                {/* Content area */}
                <Editable editor={editor} id={content.id} onChange={state => {this.setState({description: state})}}/>

                {/*  Default user interface  */}
                <Trash editor={editor}/>
                <DisplayModeToggle editor={editor}/>
                <Toolbar editor={editor}/>
            </div>
        )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        contentEditorOpen: (data) => {
            dispatch({
                type: actionType.BLOG_CONTENT_OPEN,
                value: data
            })
        },
        updateBlogItems: (data) => {
            dispatch({
                type: actionType.UPDATE_BLOG_ITEM,
                value: data
            })
        },
        fetchBlogItemsById: (data) => {
            dispatch({
                type: actionType.BLOG_ITEM_BY_ID,
                value: data
            })
        }
    }
}

export default withRouter(connect(null,mapDispatchToProps)(BlogEditor))