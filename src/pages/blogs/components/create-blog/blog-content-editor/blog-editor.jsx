import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actionType from '../../../../../store/actions/action-type'
import FloatingButton from './floating-button/floating-button'
import updateBolg from '../../../../../services/api/update-blog'
import getBlogItemsByID from '../../../../../services/api/get-blog-item-byid'

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

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


class BlogEditor extends Component {

    state = {
        loc: true
    }
  
  componentWillMount(){

    console.log(this.props.location)
    this.props.contentEditorOpen(true)
  }


  callback = (data) => {
    if(data.data.id !== this.props.match.params.id){
        alert("This Blog is not found")
        this.props.contentEditorOpen(true)
        return window.location.href='/#/blogs'
    }else if(data.status === 200){
        if(data.data.content && !this.props.blog.length>0 ){
            alert('Please go to blogs page to update content')
           return window.location.href='/#/blogs'
        }else if(data.data.content && this.props.blog.length>0 && !this.props.blog[0].content){
            alert('Please go to blogs page to update content')
            return window.location.href='/#/blogs'
        }
    }else {
        alert(data)
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
            return window.location.href='/#/blogs'
        } else {
            return false
        }
        });
    }
    componentWillUnmount() {
        this.unblock();
    }

  blogcallback = (data) => {
    
    if(data.status === 200){
        alert("Succesfull saved")
        return window.location.href='/#/blogs'
    }else if (data.response) {
        alert(data)
      } else {
        const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
        alert(genericErrorMsg)
      }
 }

 updateContent = () => {
     const data = {
        content: JSON.stringify(this.editorState)
     }
     const id = this.props.match.params.id
     if(id){
         updateBolg(this.blogcallback,id ,data)
     }
     
 }

  render() {
    // Creates an empty editable
    let content = createEmptyState();

    //console.log(this.props.blog)
    
    if(this.props.blog.length>0){
        if(this.props.blog[0].content){
            content = JSON.parse(this.props.blog[0].content)
        }else{
            content = createEmptyState()
        }
    }

    const plugins = {
      content: [slate(),spacer,imagePlugin,video,divider], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
      layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
      native
    }
    
    // Instantiate the editor
    const editor = new Editor({
        defaultPlugin: slate(),
        plugins: plugins,
        editables: [content],
    })
    return (
        <div className="page page--blogs-page">
            <section className="section section--blogs">
                <FloatingButton onUpdate={this.updateContent}/>
                {/* Content area */}
                <Editable editor={editor} id={content.id} onChange={state => (this.editorState = state)}/>

                {/*  Default user interface  */}
                <Trash editor={editor}/>
                <DisplayModeToggle editor={editor}/>
                <Toolbar editor={editor}/>
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

const mapDispatchToProps = (dispatch) => {
    return{
        contentEditorOpen: (data) => {
            dispatch({
                type: actionType.BLOG_CONTENT_OPEN,
                value: data
            })
        },
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BlogEditor))