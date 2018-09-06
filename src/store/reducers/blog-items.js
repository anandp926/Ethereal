/*
 * __author__ = 'Anand Singh<anand.ethereal@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

/* This is the Reducer for the Blog Items */

import * as actionType from '../actions/action-type'

const initialState = {
  firstRun: true,
  blogItems: [],
  contentOpen: false,
  blogItemsById: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.BLOG_ITEM:
    return{
      ...state,
      blogItems: action.value
    }
    case actionType.BLOG_ITEM_BY_ID:
    return{
      ...state,
      blogItemsById:action.value
    }
    case actionType.ADD_BLOG_ITEM:
    return{
      ...state,
      blogItems: state.blogItems.concat(action.value)
    }
    case actionType.UPDATE_BLOG_ITEM:{
      return Object.assign({}, state, {
          blogItems : state.blogItems.map(blog => {
              if (blog.id !== action.value.id) {
          return blog;
      }
      return Object.assign({}, blog, {
          content: action.value.content,
      })
  })
  });
  }
    case actionType.BLOG_CONTENT_OPEN:
    return{
      ...state,
      contentOpen: action.value
    }
    case actionType.UNPUBLISHED_BLOG:{
      return Object.assign({}, state, {
        blogItems : state.blogItems.map(BLOG => {
              if (BLOG.id !== action.value.id) {
          return BLOG;
      }
      return Object.assign({}, BLOG, {
          publish : action.value.publish
      })
  })
  });
  }
  case actionType.DELETE_BLOG:
      return {
          ...state,
          blogItems: [...state.blogItems.filter(BLOG => BLOG.id !== action.value)]
      }
    default:
      return state
  }
};

export default reducer;