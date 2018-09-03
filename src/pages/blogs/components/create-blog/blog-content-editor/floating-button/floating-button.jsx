import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary'
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from 'react-modal'
import ImageLayout from '../image-layout/image-layout'
import './floating-button.css'


const styles = theme => ({
  fab: {
    position: 'absolute',    
    right: theme.spacing.unit * 3,
    top: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },

  fabBlue: {
    color: theme.palette.common.white,
    backgroundColor: blue[500],
  },
  list: {
    top: 0,
    right: theme.spacing.unit * 1,
    position:'fixed',
    zIndex: 1
  },
  tooltips: {
      maxWidth:150,
      height: 100,
      fontSize: 50,
  },
});

class FloatingActionButtonZoom extends React.Component {

    state = {
        showModal: false
    }

    insertImageLink = () => {
        this.setState({showModal: true})
        
    }
    
    closeModal = () =>{
        this.setState({showModal: false})
    }


  render() {
    const { classes } = this.props;
    
    return (
        <div>
            <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.closeModal}
            className="modalStyle"
            >
            <div className="modalContent">
                <div className="imageLayout">
                    <ImageLayout/>
                    <ImageLayout/>
                </div>
                <div className="imageUpload">
                    <form>
                        <div className="form-control">
                            <label htmlFor="img">
                                Upload Image To Get URL
                                <span className="star"> *</span>
                            </label>
                            <input type="file" className="input-element file-input" name="img" id="img"/>
                        </div>
                        <div className="upload">
                            <button className="btn" className="upload-btn">Uplaod</button>
                            <button className="btn" className="upload-btn" onClick={this.closeModal}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            </Modal>
            <List className={classes.list}>
                <ListItem>
                    <Tooltip title="Save" placement="left" className={classes.tooltips} >
                        <Button variant="fab" className={classes.fabGreen} color= 'inherit' onClick={() => this.props.onUpdate()}>
                            <Save />
                        </Button>
                    </Tooltip>
                </ListItem>
                <ListItem>
                    <Tooltip title="Insert Image Link" placement="left">
                        <Button variant="fab" className={classes.fabBlue} color= 'inherit' onClick={this.insertImageLink}>
                            <PhotoLibrary />
                        </Button>
                    </Tooltip>
                </ListItem>
            </List>
        </div>
    );
  }
}

FloatingActionButtonZoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);