import React, { Component } from 'react'
import { connect } from'react-redux'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control'
import '../../../../components/pages-component/button/button.css'
import * as actionType from '../../../../store/actions/action-type'
import * as utilityFunctions from '../../../../utility-functions/utility-functions'
import postMedia from '../../../../services/api/post-media'
import mediaUpdate from '../../../../services/api/media-update'
import ErrorBox from '../../../../components/pages-component/form/components/error-box';
import Loader from '../../../../components/ui/loader/loader';
import uuid from 'uuid'

class MediaForm extends Component{

    state = {
        title: "",
        link:"",
        publisher:"",
        thumbnail:"",
        description:"",
        published_at:"",
        mediaId:'',
        id:uuid(),
        publish:false,
        formValid: true,
        errorMsg: null,
        formSubmissionStart: false,
    };
    
    componentDidMount(){
        if(this.props.mediaId){
            const filterMedia = this.props.mediaItems.filter((data) => data.id === this.props.mediaId);
            filterMedia.map((data) => (
                this.setState({
                    title: data.title,
                    link: data.link,
                    publisher: data.publisher,
                    thumbnail: data.thumbnail,
                    description: data.description,
                    published_at: data.published_at,
                    publish: data.publish,
                    id:data.id
                })
            ))
        }
    }

    submitCallBack = (data) => {
        let code =201, mediaData = this.onAddMedia()
        if(this.props.updateMedia){
            code = 200
        }
        if (data.status === code) {
            this.clearForm()
            this.props.closeModal()
            utilityFunctions.clearSelectField('.select-input');
            if(this.props.updateMedia){
                this.props.updateMedias(mediaData)
            }else{
                this.props.postMedia(mediaData)
            }
            this.setState({
                ...this.state,
                formValid: true,
                errorMsg: null,
                formSubmissionStart: false
            });
        }else if (data.response) {
                this.setState({
                    ...this.state,
                    formValid: false,
                    errorMsg: data.response.data,
                    formSubmissionStart: false
                });
            }else {
            const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
            this.setState({
                ...this.state,
                formValid: false,
                errorMsg: genericErrorMsg,
                formSubmissionStart: false
            });
        }
    }

    onMediaSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            ...this.state,
            formSubmissionStart: true
        });
        const data = this.onAddMedia()
        if(this.props.updateMedia){
                mediaUpdate(this.submitCallBack,this.state.id, data)
        }else{
            if(data){
                postMedia(this.submitCallBack,data)
            }
        }
    };

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    onAddMedia = () => {
        const { title, link, publisher, thumbnail, description, published_at, publish,id } = this.state
        const mediaData = {
            title: title,
            link: link,
            publisher: publisher,
            thumbnail: thumbnail,
            description: description,
            published_at:published_at,
            publish: publish,
            id:id
        };
        return mediaData
    };

    clearForm = () => {
        this.setState({
            title: '',
            link: '',
            publisher: '',
            thumbnail: '',
            description: '',
            published_at: '',
            publish: false
        })
    }

    render(){
        
        return(
            <form onSubmit={this.onMediaSubmit}>
                <FormControl>
                    <label htmlFor="title">
                        title
                        <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter the title"
                        className="input-element"
                        id="title"
                        value={this.state.title}
                        onChange={ e => this.handleInputChange(e)}
                        required={true}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="link">
                        link
                        <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        name="link"
                        placeholder="Enter the media link"
                        className="input-element"
                        id="link"
                        value={this.state.link}
                        onChange={ e => this.handleInputChange(e)}
                        required={true}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="publisher">
                        publisher
                        <span className="star">*</span>
                    </label>
                    <input
                        type="text"
                        name="publisher"
                        placeholder="Enter the publisher name"
                        className="input-element"
                        id="publisher"
                        value={this.state.publisher}
                        onChange={ e => this.handleInputChange(e)}
                        required={true}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="published_at">
                        published_at
                        <span className="star">*</span>
                    </label>
                    <input
                        type="date"
                        name="published_at"
                        placeholder="Enter the publisher name"
                        className="input-element"
                        id="publisher"
                        value={this.state.published_at}
                        onChange={ e => this.handleInputChange(e)}
                        required={true}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="thumbnail">
                        image
                    </label>
                    <input
                        type="text"
                        name="thumbnail"
                        placeholder="Enter the image link"
                        className="input-element"
                        id="thumbnail"
                        value={this.state.thumbnail}
                        onChange={ e => this.handleInputChange(e)}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="description">
                        description
                    </label>
                    <textarea
                        type="textarea"
                        name="description"
                        placeholder="Enter the description"
                        className="input-element"
                        id="description"
                        value={this.state.description}
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
                <button type="submit" className="form-btn" onClick={this.onAddMedia}>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mediaItems: state.media.mediaItems
    };
};

const mapDispathcToProps = (dispatch) => {
    return{
        postMedia: (data) => {
            dispatch({
                type: actionType.POST_MEDIA_ITEMS,
                value: data
            })
        },
        updateMedias: (data) => {
            dispatch({
                type: actionType.UPDATE_MEDIA,
                value: data
            });
        },
    }
}

export default connect(mapStateToProps, mapDispathcToProps)(MediaForm)
