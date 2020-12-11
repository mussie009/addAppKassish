import api from '../utils/api';

const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    return api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress
    });
};

const download = () => {

};

const fileService = {
    upload,
    download
};

export default fileService;