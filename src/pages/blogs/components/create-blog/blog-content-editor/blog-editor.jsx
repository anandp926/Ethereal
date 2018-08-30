import React, { Component } from 'react'

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

// Creates an empty editable
const content = createEmptyState()

const plugins = {
  content: [slate(), spacer, image, video, divider], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
  // If you pass the native key the editor will be able to handle native drag and drop events (such as links, text, etc).
  // The native plugin will then be responsible to properly display the data which was dropped onto the editor.
  layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
  native,
}

const editor = new Editor({
  defaultPlugin: slate(),
  plugins: plugins,
  editables: [content],
});


editor.trigger.mode.edit()

class BlogEditor extends Component{

    render(){
        return(
            <div style={{marginTop:60, padding:40}}>
                <FloatingButton/>
                {/* Content area */}
                <Editable editor={editor} id={content.id} onChange={state => (this.editorState = state)}/>

                {/*  Default user interface  */}
                <Trash editor={editor}/>
                <DisplayModeToggle editor={editor}/>
                <Toolbar editor={editor}/>
            </div>
        )
    }
}

export default BlogEditor