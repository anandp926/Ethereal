import React, { Component } from 'react';
import { connect } from 'react-redux'
import PageBanner from '../../../../components/ui/page-banner/page-banner';
import SectionHeading from '../../../../components/pages-component/section-heading/section-heading';
import '../career/career.css'
import JobDescription from './job-description';
import { Link } from 'react-router-dom'
import getJOb from '../../../../services/api/fetch-job'
import * as actionType from '../../../../store/actions/action-type'
import ErrorPage from '../../../error-page/error-page';

class Apply extends Component{

    state = {
        errMsg:'',
        open: false
    }

    componentDidMount(){
        const id = this.props.match.params.id
        if(id){
            getJOb(this.callback,id)
        }
    }

    callback = (data) => {
        if(data.status === 200){
            this.props.getJob(data.data)
            this.setState({
                errMsg: ''
            })
        }else {
            this.setState({
                errMsg: data.status
            })
        }
    }

    openForm = () => {
        this.setState({
            open:!this.state.open
        })
    }

    render(){
        
        return(
            <React.Fragment>
                <div className="page page--careers">
                    <PageBanner heading={"Careers in Ethereal Machines"} subHeading={"Make your dream job come true"} classValue={"page-banner--careers"} />
                    <section className="section section--openings">
                        { 
                            this.state.errMsg === 'Not Found'
                            ?
                            <ErrorPage msg={"job"} />
                            :
                            <div className="container">
                                <SectionHeading classValue={'u-margin-bottom-big u-text-center'} name={this.props.jobItems.position} />
                            <JobDescription 
                                jobItem={this.props.jobItems} 
                                openForm={this.openForm} 
                                open={this.state.open}
                            />
                        </div>
                        }
                        
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        jobItems: state.jobs.jobItemsById,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getJob: (data) => {
            dispatch({
                type: actionType.FETCH_JOB_BY_ID,
                value: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Apply)