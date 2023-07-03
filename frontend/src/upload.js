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

        console.log("uploading")
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            fetch('http://127.0.0.1:8000/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
             
                    setServerResponse(data.message);
                    if (data.message == "uploaded successfully") {
                        setIsSuccess(true);
                    }
                    else { setIsSuccess(false) }
                    setTimeout(() => {
                        setServerResponse(null);
                    }, 3000);
                })
                .catch((error) => {
                 
                    setServerResponse(error.message);
                    setIsSuccess(false);
                    setTimeout(() => {
                        setServerResponse(null);
                    }, 3000);
                });
        }
    };

    return (
        <>
            <input type="file" accept=".csv" onChange={handleFileSelect} />
            <button onClick={handleUpload}>Upload</button>
            {serverResponse && (<div className={`server-response ${isSuccess ? 'success' : 'error'}`}>
                {serverResponse}
            </div>)}
        </>
    );
};

export default UploadComponent;
