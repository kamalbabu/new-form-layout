import React, { Component,Fragment } from 'react';
import * as Constant from "../../common/constants";
import {MDBIcon} from 'mdbreact';
import './Upload.css';

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL',
            file:null
        }
        this.triggerUpload=this.triggerUpload.bind(this);
    }

    triggerUpload(){
        this.inputElement.click();
    }

    handleImageChange(e){
        e.preventDefault();
  
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = async () => {
          await this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
          let response = {
            type: Constant.CONVERSATION_TYPE.TEXT,
            data: {
                id: 'UPLOAD_ID',
                timestamp: new Date().toUTCString(),
                text:this.state.imagePreviewUrl,
                action:'PROCESS_ID'
                
            }
          };
          this.props.onUpload(response)
        }
        reader.readAsDataURL(file)
    }

    render() {
        return (
            <Fragment>
                <div className="imgPreview">
                    {this.imagePreview}
                </div>
                <input className="fileInput invisible" 
                       type="file" 
                       ref={input => this.inputElement = input}
                       onChange={(e)=>this.handleImageChange(e)} />
                <MDBIcon icon="cloud-upload-alt"
                         size="5x"
                         className="icon-upload"
                         onClick={this.triggerUpload}/>
            </Fragment>
        );
    }
}
export default UploadFile;