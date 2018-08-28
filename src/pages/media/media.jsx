/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import * as actionType from '../../store/actions/action-type';
import Modal from '../../components/ui/modal/modal'
// importing the API used for this page
import getMedia from '../../services/api/get-media';
import pubUnpubMedia from '../../services/api/media-unpublised'
import deleteMedia from '../../services/api/media-delete'
// importing UI component used
import SectionHeading from '../../components/pages-component/section-heading/section-heading';
import PageBanner from '../../components/ui/page-banner/page-banner';
import MediaItem from './components/media-item/media-item';
import ContentLoader from '../../components/ui/content-loader/content-loader';
import ContactUsBanner from '../../components/pages-component/contact-us-banner/contact-us-banner';
import './media.css';
import '../../components/pages-component/button/button.css'

import ShowMsg from '../../components/pages-component/showMSG/msg'
import MediaForm from './components/media-form/media-form';

class Media extends Component {

  state = {
    loadingContent: this.props.firstRun ? true : false,
    showModal: false,
    createMedia:false,
    updateMedia:false,
    mediaId:'',
    msg:false,
    msgContent:'',
    attention:false
  }

  onGetMedia = (data) => {
    this.setState({
      loadingContent: false
    });

    if (data.status === 'error') {
      data.data.response ? console.log(data.data.response) : console.log(data.data);
    } else {
      this.props.onUpdateMediaItems(data);
      this.props.onUpdateFirstRun(false);
    }
  }

  componentDidMount() {
    // scrolling the component to the top when the page is mounted
    window.scrollTo(0, 0);

    /**
     * If the component is being loaded for the first time
     * then fetch the media items available on the server. If component is
     * not loaded for the first time, no need to fetch the media
     * items from the server. The Redux Store will have all the
     * available items.
    */
    if (this.props.firstRun) {
      getMedia(this.onGetMedia);
    }
  }

  addMedia = () => {
    this.setState({
      ...this.state,
      showModal: true,
      createMedia: true
    })
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false,
      mediaId: '',
      msg:false,
      msgContent:'',
      attention:false,
      createMedia: false,
      updateMedia:false
    });
  }
  onUpdate = (id) => {
    this.setState({
      ...this.state,
      showModal: true,
      mediaId: id,
      updateMedia:true
    })
  };

  unPublishCallback = (data) => {
    if(data.status === 200){
      this.setState({
        msg:true,
        msgContent: 'Successfully Changed',
        showModal: true,
        attention:false
      })
    }else{
      this.setState({
        msg:true,
        msgContent: 'Something Went Wrong',
        showModal: true,
        attention:true
      })
    }
  };
  
  publishMedia = (id) => {
    const data = {
      id: id,
      publish: true
    }
    pubUnpubMedia(this.unPublishCallback,id,{publish:true})
    this.props.pubunpubMedia(data)
  };
  unpublishMedia = (id) => {
    const data = {
      id: id,
      publish: false
    }
    pubUnpubMedia(this.unPublishCallback,id,{publish:false})
    this.props.pubunpubMedia(data)
  };

  deleteJobCallback = (data) => {
    if(data.status === 204){
      this.setState({
        msg:true,
        msgContent: 'Successfully Deleted',
        showModal: true,
        attention: false
      })
    }else{
      this.setState({
        msg:true,
        msgContent: 'Something Went Wrong',
        showModal: true,
        attention: true
      })
    }
  };
  deleteMedia = (id) => {
    deleteMedia(this.deleteJobCallback,id)
    this.props.deleteMedia(id)
  };

  render() {
    const media = this.props.mediaItems.map(item => {
      return (
        <LazyLoad height={200} offset={100} placeholder={<ContentLoader />} once key={item.id}>
          <MediaItem 
            item={item} 
            onUpdate={this.onUpdate} 
            session={this.props.session.session}
            publishMedia={this.publishMedia} 
            unpublishMedia={this.unpublishMedia}
            deleteMedia = {this.deleteMedia}
          />
        </LazyLoad>
      );
    });

    let mediaLoader = [];

    for (let i = 0; i < 6; i++) {
      mediaLoader.push(
        <ContentLoader key={i + '_loader'} />
      );
    }

    return (
      <React.Fragment>
      <div className="page page--media">
        {
          this.state.msg
            ?
            <Modal show={this.state.showModal} clicked={this.closeModal}>
              <ShowMsg msg={this.state.msgContent} attention={this.state.attention}/>
            </Modal>
            : null
        }
        {
          this.state.updateMedia || this.state.createMedia
          ?
          <Modal show={this.state.showModal} clicked={this.closeModal} >
            <MediaForm 
              mediaId={this.state.mediaId} 
              closeModal={this.closeModal}
              updateMedia={this.state.updateMedia}
            />
          </Modal>
          : null
        }
          <PageBanner heading={"Ethereal Machines in Media"} classValue={'page-banner--media'}/>
          <section className="section section--media">
            <div className="container">
              {/* <SectionHeading name={"What media says about us"} classValue={"u-margin-bottom-big u-text-center"}/> */}
              {
                  this.props.session.session
                  ?
                    <button className="form-btn" onClick={this.addMedia}>Add new media</button>
                  :
                      null
                }
              <div className="media-container">
                {
                  this.state.loadingContent ? 
                  mediaLoader :
                  media
                }
              </div>
            </div>
          </section>
          <section className="section section--contact-us">
            <div className="container">
                <SectionHeading name={"Contact Us"} classValue={"u-margin-bottom-big u-text-center"}/>
                <ContactUsBanner
                  firstText={"We are excited to tell you more about our story."}
                  secondText={"Let's get in touch."}
                />
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstRun: state.media.firstRun,
    mediaItems: state.media.mediaItems,
    session: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateFirstRun: (firstRun) => {
      dispatch({
        type: actionType.UPDATE_FIRST_RUN_MEDIA,
        value: firstRun
      });
    },
    onUpdateMediaItems: (mediaItems) => {
      dispatch({
        type: actionType.UPDATE_MEDIA_ITEMS,
        value: mediaItems
      });
    },
    pubunpubMedia: (data) => {
      dispatch({
        type: actionType.UNPUBLISHED_MEDIA,
        value: data
      });
    },
    deleteMedia: (data) => {
      dispatch({
        type: actionType.DELETE_MEDIA,
        value: data
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Media);
