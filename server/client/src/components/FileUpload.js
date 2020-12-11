// React
import React, { useState } from 'react';

// Material UI
import LinearProgress from '@material-ui/core/LinearProgress';

// Services
import fileService from '../services/fileService';

const FileUpload = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
  };

  const upload = () => {
    fileService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        console.log("Uploaded successfully");
      })
      .catch(() => {
        setProgress(0);
        setCurrentFile(undefined);
        console.log("Could not upload..."); // Bruke toaster?
      });
  };

  return (
    <div>
      <div>
        <input type="file" onChange={selectFile} />

        <button
          disabled={!currentFile}
          onClick={upload}
        >
          Upload
        </button>
      </div>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default FileUpload;
