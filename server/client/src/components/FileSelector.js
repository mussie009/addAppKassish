import React, { useRef } from 'react';
import supportedTypes from '../utils/supportedTypes';

const FileSelector = (props) => {

    const hiddenFileInput = useRef(null);
  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = (e) =>  {
        const files = e.target.files;
         if (files && files[0]) props.selectFile(files[0]);
    };

  
    return (
        <div className="mt-5 space">
            <div>
                <a className="custom-button" onClick={handleClick}>
                    Velg en fil for å laste opp
                </a>
                <input 
                    id="file-upload" 
                    type="file" 
                    accept={supportedTypes} 
                    onChange={handleChange} 
                    ref={hiddenFileInput}
                />
            </div>
            <p className="text-white m-2">{props.fileName}</p>
        </div>
    );
  
}

export default FileSelector;