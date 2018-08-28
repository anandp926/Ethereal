/*
 * __author__ = 'Anand Singh <anand.ethereal@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload';
import Spinner from '../../components/ui/spinner/spinner';

// importing UI component used
import SectionHeading from '../../components/pages-component/section-heading/section-heading'
import PageBanner from '../../components/ui/page-banner/page-banner';
import './components/blogs-page/blogs-page.css'
import '../../components/pages-component/button/button.css'

class Blogs extends Component{
    render(){
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
                    {/* { blogsItem } */}
                  </div>
                </div>
              </section>
            </div>
          );
    }
}

export default Blogs