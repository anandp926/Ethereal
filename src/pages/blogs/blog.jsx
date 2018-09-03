/*
 * __author__ = 'Anand Singh <anand.ethereal@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload';
import Spinner from '../../components/ui/spinner/spinner';
import * as actionType from '../../store/actions/action-type'
import getBlogs from '../../services/api/get-blog-items'

// importing UI component used
import SectionHeading from '../../components/pages-component/section-heading/section-heading'
import PageBanner from '../../components/ui/page-banner/page-banner';
import './components/blogs-page/blogs-page.css'
import '../../components/pages-component/button/button.css'
import BlogItem from './components/blog-item/blog-item'

class Blogs extends Component{


  blogsCallback = (data) => {
    if(data.status === 200){
      this.props.fetchBlogs(data.data)
    }
  }

  componentDidMount(){
    window.scrollTo(0,0);
    getBlogs(this.blogsCallback)
  }

    render(){
      const blogsItem = this.props.blog.blogItems.map((item) => {
        return (
          <LazyLoad height={200} offset={100} placeholder={<Spinner />} once key={item.id}>
            <BlogItem
              title={item.title}
              date={item.created_at}
              id={item.id}
              imgUrl={item.thumbnail}
            />
          </LazyLoad>
        );
      });
        return (
            <div className="page page--blogs-page">
              <PageBanner heading={'Ethereal Machines Blogs'} classValue={'page-banner--blogs-page'}/>
              <section className="section section--blogs">
                <div className="container">
                  <Link to="/blogs/create">
                    <button className="form-btn">Create blog</button>
                  </Link>
                  <SectionHeading name={"Featured Blogs"} classValue={"u-margin-bottom-big u-text-center"}/>
                  <div className="blog-item-container three-col-layout">
                    {  blogsItem  }
                  </div>
                </div>
              </section>
            </div>
          );
    }
}

const mapStateToProps = (state) =>{
  return{
    session: state.login,
    blog: state.blog
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchBlogs: (data) => {
      dispatch({
        type: actionType.BLOG_ITEM,
        value: data
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Blogs)