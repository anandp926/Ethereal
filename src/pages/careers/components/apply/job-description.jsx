import React from 'react'
import ApplyForm from './apply-form'
import ReactHtmlParser from 'react-html-parser';
import '../../../../components/pages-component/button/button.css'

const jobDescription = (props) => {
    return(
            <div className="apply-career-item">
                <div className="apply-career-details-container">
                    <div className="career-title subtitle">
                        <span>Job Description</span>
                    </div>
                    <div className="career-date-publisher flex-row">
                    <span className="career-publisher">
                        {props.jobItem.experience}
                    </span>
                        {/* <span className="career-date">
                        <img src={calendarIcon} alt="Calendar" width="16" height="16" className="icon"/>
                        <span>Published On:</span>ssf
                        <span>{props.jobItem.created_at}</span>
                        </span> */}
                    </div>
                    <div className="apply-career-description">
                        {ReactHtmlParser(props.jobItem.description)}
                    </div>
                    <button className='form-btn' onClick={props.openForm}>Apply</button>
                </div>
                {   
                    props.open
                    ?
                    <section className="section section--careers-form">
                        <div className="container">
                            <ApplyForm position={props.jobItem.position} openForm={props.openForm}/>
                        </div>
                    </section>
                    
                    :
                    null
                }               
            </div>
    )
}

export default jobDescription