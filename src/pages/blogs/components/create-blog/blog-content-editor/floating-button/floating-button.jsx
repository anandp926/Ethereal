import React from 'react';
import {connect} from 'react-redux'
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
import uploadImage from '../../../../../../services/api/uploadImage'
import Loader from '../../../../../../components/ui/loader/loader'
import ErrorBox from '../../../../../../components/pages-component/form/components/error-box'
import * as actionType from '../../../../../../store/actions/action-type'


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
      maxWidth:200,
      height: 30,
      fontSize: 15,
      textAlign: 'center',
      backgroundColor:'black',
      borderRadius:0
  },
});

class FloatingActionButtonZoom extends React.Component {
    constructor(props) {
        super(props);
        this.imageSize = null;
        this.data = new FormData();
      }

    state = {
        showModal: false,
        errorMsg: null,
        formSubmissionStart: false,
    }

    insertImageLink = () => {
        
        this.setState({
            showModal: true
        })
        
    }
    
    closeModal = () =>{
        this.data.delete('images')
        this.setState({
            showModal: false,
            errorMsg: null,
            formSubmissionStart: false,
        })
    }

    imageCallback = (data) => {
        if(data.status === 201){
            this.props.addImages(data.data)
            this.setState({
                ...this.state,
                errorMsg: null,
                formSubmissionStart: false
            });
        }else if (data.response) {
                this.setState({
                    ...this.state,
                    errorMsg: data.response.data,
                    formSubmissionStart: false
                });
            }else {
            const genericErrorMsg = { Error: ["Oops! Something went wrong, please try again."] };
            const fileErrorMsg = { Resume: ["Max. limit for resume 5 MB"] };
            this.setState({
                ...this.state,
                errorMsg: this.fileSize > 5 ? fileErrorMsg : genericErrorMsg,
                formSubmissionStart: false
            });
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            formSubmissionStart: true
          });
        if(this.data){
            const imgData = this.data
            uploadImage(this.imageCallback, imgData)
            }
               
    }

    inputChange = (e) => {
        this.imageSize = (e.target.files[0].size / (1024*1024)).toFixed(0)
        this.setState({images: e.target.files[0]})
        let file = e.target.files[0];
        
        if (file) {
          this.data.append('images', file);
        }
    }

  render() {
    const { classes } = this.props;
    
    return (
        <div>
            <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.closeModal}
            className="modalStyle"
            ariaHideApp={false}
            >
            <div className="modalContent">
                <div className="imageLayout">
                    <ImageLayout/>
                </div>
                <div className="imageUpload">
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-control">
                            <label htmlFor="img">
                                Upload Image To Get URL
                                <span className="star"> *</span>
                            </label>
                            <input 
                                type="file" 
                                className="input-element file-input" 
                                name="images" 
                                id="img"
                                onChange={e => this.inputChange(e)}
                                accept=".jpeg, .jpg, .png" 
                                required={true}   
                            />
                        </div>
                        { this.state.errorMsg ? <ErrorBox isRequired errorMsg={this.state.errorMsg} /> : null}
                        { this.state.formSubmissionStart ? <Loader>Submitting your request...</Loader> : null }
                    
                        <div className="upload">
                            <button className="upload-btn" disabled={this.state.formSubmissionStart} >Uplaod</button>
                            <button className="upload-btn" onClick={this.closeModal}>cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            </Modal>
            <List className={classes.list}>
                <ListItem>
                    <Tooltip title="Save" placement="left" classes={{ tooltip: classes.tooltips }}>
                        <Button variant="fab" className={classes.fabGreen} color= 'inherit' onClick={() => this.props.onUpdate()}>
                            <Save />
                        </Button>
                    </Tooltip>
                </ListItem>
                <ListItem>
                    <Tooltip title="Insert Image Link" placement="left" classes={{ tooltip: classes.tooltips }}>
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

const mapDispatchToProps = (dispatch) => {
    return{
      addImages:  (data) => {
        dispatch({
          type:actionType.ADD_IMAGE_GALLARY,
          value: data
        })
      }
    }
  }


export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(FloatingActionButtonZoom));