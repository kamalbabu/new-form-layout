import React, { Component } from 'react';
import * as Constant from "../../common/constants";
import './Upload.css';

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL',
            file:null
        }
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
            <div>
                <div className="imgPreview">
                    {this.imagePreview}
                </div>
                <input className="fileInput" 
                       type="file" 
                       onChange={(e)=>this.handleImageChange(e)} />
            </div>
        );
    }
}
export default UploadFile;