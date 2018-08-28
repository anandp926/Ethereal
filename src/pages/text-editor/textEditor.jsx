import React,{Component} from 'react'
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import '../text-editor/textEditor.css';

class TextEditor extends Component{
      
      render () {
        return (
          <div>
            <ReactQuill 
              theme="snow"
              onChange={this.props.onChangeTextEditor}
              value={this.props.value}
              modules={TextEditor.modules}
              formats={TextEditor.formats}
              placeholder={this.props.placeholder}
             />
           </div>
         )
      }
    }


TextEditor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }

TextEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

TextEditor.propTypes = {
  placeholder: PropTypes.string
};

export default TextEditor