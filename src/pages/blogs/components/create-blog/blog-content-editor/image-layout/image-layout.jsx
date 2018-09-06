import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './image-layout.css'
import getGallary from '../../../../../../services/api/get-gallary'
import * as actionType from '../../../../../../store/actions/action-type'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 555,
    height: 500,
  },
});
 
  class ImageLayout extends Component{

    state = {
      loading: true
    }

    gallaryCallback = (data) => {
      if(data.status === 200){
        this.props.getImages(data.data)
        this.setState({
          loading:false
        })
      }else{
        console.log(data)
      }
    }

    componentDidMount(){
      getGallary(this.gallaryCallback)
    }

    copyUrl = (id) => {
      var copyText = document.getElementById(id);
      copyText.select();
      document.execCommand("copy");
    }

    render(){
      const { classes } = this.props;
      return (
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList}>
          {
            this.props.gallaryItems !== undefined &&(
              this.props.gallaryItems.map(tile => (
                <GridListTile key={tile.id}>
                  <img src={tile.images} alt={tile.title} />
                  <GridListTileBar
                    subtitle={
                      <div className="InputAddOn">
                          <span>
                          <button className="image-layout-btn" onClick={() => this.copyUrl(tile.id)}>copy</button>
                          </span>
                          <input type="text" className="InputAddOn-field" id={tile.id} value={tile.images} readOnly={true}/>
                      </div>
                      }
                  />
                </GridListTile>
              ))
            )
          }
        </GridList>
      </div>
  );
    }
  }

  ImageLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    gallaryItems: state.gallary.gallaryItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getImages:  (data) => {
      dispatch({
        type:actionType.IMAGE_GALLARY,
        value: data
      })
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(ImageLayout));