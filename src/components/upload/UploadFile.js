import React, { Component } from 'react';
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
          console.log(this.state);
          let imagePreview = (<div className="imagePreview"><img src={this.state.imagePreviewUrl} /></div>);
          this.props.onUpload(imagePreview)
        }
        reader.readAsDataURL(file)
    }

    render() {
        
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        //console.log(imagePreviewUrl);
        //console.log(imagePreview);
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