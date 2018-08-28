import React, { Component } from 'react'
import { connect } from'react-redux'
import FormControl from '../../../../components/pages-component/form-controls/components/form-control'
import '../../../../components/pages-component/button/button.css'

class MediaForm extends Component{

    state = {
        title: "",
        link:"",
        publisher:"",
        thumbnail:"",
        description:"",
        published_at:"",
        isRequired:true
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
                })
            ))
        }
        console.log(this.props.mediaItems)
    }

    onMediaSubmit = (e) =>{
        e.preventDefault();
    };

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    
    onAddMedia = () => {
        const { title, link, publisher, thumbnail, description, published_at } = this.state
        const mediaData = {
            title: title,
            link: link,
            publisher: publisher,
            thumbnail: thumbnail,
            description: description,
            published_at:published_at
        };
        console.log(mediaData)
    };

    render(){
        const { isRequired } = this.state;
        return(
            <form onSubmit={this.onMediaSubmit}>
                <FormControl>
                    <label htmlFor="title">
                        title
                        {isRequired ? <span className="star">*</span> : null}
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter the title"
                        className="input-element"
                        id="title"
                        value={this.state.title}
                        onChange={ e => this.handleInputChange(e)}
                        required={isRequired}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="link">
                        link
                        {isRequired ? <span className="star">*</span> : null}
                    </label>
                    <input
                        type="text"
                        name="link"
                        placeholder="Enter the media link"
                        className="input-element"
                        id="link"
                        value={this.state.link}
                        onChange={ e => this.handleInputChange(e)}
                        required={isRequired}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="publisher">
                        publisher
                        {isRequired ? <span className="star">*</span> : null}
                    </label>
                    <input
                        type="text"
                        name="publisher"
                        placeholder="Enter the publisher name"
                        className="input-element"
                        id="publisher"
                        value={this.state.publisher}
                        onChange={ e => this.handleInputChange(e)}
                        required={isRequired}
                    />
                </FormControl>
                <FormControl>
                    <label htmlFor="published_at">
                        published_at
                        {isRequired ? <span className="star">*</span> : null}
                    </label>
                    <input
                        type="date"
                        name="published_at"
                        placeholder="Enter the publisher name"
                        className="input-element"
                        id="publisher"
                        value={this.state.published_at}
                        onChange={ e => this.handleInputChange(e)}
                        required={isRequired}
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

export default connect(mapStateToProps,null)(MediaForm)
