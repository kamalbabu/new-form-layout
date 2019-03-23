import React, { Component } from 'react';
import Webcam from "react-webcam";

class ScanDoc extends Component {
    setRef = webcam => {
        //Test
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: { exact: "environment" }
        };

        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );

    }
}

export default ScanDoc