import React from 'react'
import './career.css'
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'



const career = (props) => {
    return(
        <div className="career-item flex-row">
            <div className="career-details-container">
                <div className="career-title subtitle">
                    <span>{props.jobItems.position}</span>
                </div>
                <div className="career-date-publisher flex-row">
                <span className="career-publisher">
                    {props.jobItems.experience}
                </span>
                    {/* <span className="career-date">
                     <img src={calendarIcon} alt="Calendar" width="16" height="16" className="icon"/>
                     <span>Published On:</span>ssf
                     <span>{props.item.published_at}</span>
                     </span> */}
                </div>
                <div className="career-description">
                    {ReactHtmlParser(props.jobItems.description.substring(0,200))}{"..."}
                </div>
                {
                    props.session
                    ?
                        <div className="career-link">
                            <ul className="display-list">
                                <li>
                                    <Link to={`/careers/apply/${props.jobItems.id}`} >Apply</Link>
                                </li>
                                <li>
                                    <a onClick={() => props.updateCareer(props.jobItems.id)}>Update</a>
                                </li>
                                <li>
                                    {
                                        props.jobItems.publish
                                        ?
                                            <a onClick={() => props.unpublishJob(props.jobItems.id,false)} >UnPublish</a>
                                        :
                                            <a onClick={() => props.publishJob(props.jobItems.id,true)} >Publish</a>
                                    }
                                </li>
                                <li>
                                    <a onClick={() => props.deleteJob(props.jobItems.id)}>Delete</a>
                                </li>
                            </ul>
                        </div>
                    :
                        <div className="career-link">
                            <Link to={`/careers/apply/${props.jobItems.id}`} >Apply</Link>
                        </div>
                }
            </div>
        </div>
    )
};

export default career