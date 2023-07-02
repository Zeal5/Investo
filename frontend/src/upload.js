import React, { useState } from 'react';

const UploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [serverResponse, setServerResponse] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("file selected")
    };

    const handleUpload = () => {
        // Perform the upload using REST API
        console.log("uploading")
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('http://127.0.0.1:8000/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) =>  response.json())
                .then((data) => {
                    // Handle the response from the API
                    setServerResponse(data.message);
                    setIsSuccess(true);
                    setTimeout(() => {
                        setServerResponse(null);
                    }, 3000);
                })
                .catch((error) => {
                    // Handle any errors
                    setServerResponse(error.message);
                    setIsSuccess(false);
                    setTimeout(() => {
                        setServerResponse(null);
                    }, 3000);
                });
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileSelect} />
            <button onClick={handleUpload}>Upload</button>
            <button className='download-button'>Download</button>
            {serverResponse && ( <div className={`server-response ${isSuccess ? 'success' : 'error'}`}> 
            {serverResponse}
        </div>
            )}
        </div>
    );
};

export default UploadComponent;
