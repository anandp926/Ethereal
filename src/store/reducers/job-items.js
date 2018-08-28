/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

/* This is the Reducer for the Job Items */

import * as actionType from '../actions/action-type';

const initialState = {
  firstRun: true,
  jobItems: [],
  jobItemsById: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionType.FETCH_JOB:
        return {
            ...state,
            jobItems: action.value
        }
    case actionType.FETCH_JOB_BY_ID:
        return {
            ...state,
            jobItemsById: action.value
        }
    case actionType.CREATE_JOB:
        return {
            ...state,
            jobItems: state.jobItems.concat(action.value)
        }
    case actionType.UPDATE_JOB:{
        return Object.assign({}, state, {
            jobItems : state.jobItems.map(job => {
                if (job.id !== action.value.id) {
            return job;
        }
        return Object.assign({}, job, {
            position: action.value.position,
            description: action.value.description,
            skills: action.value.skills,
            location: action.value.location,
            qualification: action.value.qualification,
            experience: action.value.experience,
            publish : action.value.publish
        })
    })
    });
    }
    case actionType.UNPUBLISHED_JOB:{
        return Object.assign({}, state, {
            jobItems : state.jobItems.map(job => {
                if (job.id !== action.value.id) {
            return job;
        }
        return Object.assign({}, job, {
            publish : action.value.publish
        })
    })
    });
    }
    case actionType.DELETE_JOB:
        return {
            ...state,
            jobItems: [...state.jobItems.filter(job => job.id !== action.value)]
        }
    default:
        return state
  }
};

export default reducer;
