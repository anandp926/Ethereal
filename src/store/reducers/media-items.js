/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

/* This is the Reducer for the Media Items */

import * as actionType from '../actions/action-type';

const initialState = {
  firstRun: true,
  mediaItems: []
};

const reducer = (state = initialState, action) => {
  if (action.type === actionType.UPDATE_FIRST_RUN_MEDIA) {
    return {
      ...state,
      firstRun: action.value
    };
  }

  if (action.type === actionType.UPDATE_MEDIA_ITEMS) {
    return {
      ...state,
      mediaItems: state.mediaItems.concat(action.value)
    };
  }
  
  if(action.type === actionType.POST_MEDIA_ITEMS) {
    return {
        ...state,
        mediaItems: state.mediaItems.concat(action.value)
    }
  }

  if(action.type === actionType.UNPUBLISHED_MEDIA){
    return Object.assign({}, state, {
      mediaItems : state.mediaItems.map(media => {
          if (media.id !== action.value.id) {
      return media;
  }
    return Object.assign({}, media, {
        publish : action.value.publish
      })
      })
    });
  }

  if(action.type === actionType.DELETE_MEDIA){
    return {
      ...state,
      mediaItems: [...state.mediaItems.filter(media => media.id !== action.value)]
    }
  }

  if(action.type === actionType.UPDATE_MEDIA){
    return Object.assign({}, state, {
      mediaItems : state.mediaItems.map(media => {
          if (media.id !== action.value.id) {
      return media;
  }
    return Object.assign({}, media, {
        title: action.value.title,
        link: action.value.link,
        publisher: action.value.publisher,
        thumbnail: action.value.thumbnail,
        description: action.value.description,
        published_at:action.value.published_at,
        publish : action.value.publish
      })
      })
    });
  }

  return state;
};


export default reducer;
