import React, { useState, useRef } from 'react';
import './App.css';
import UploadComponent from './upload';
import DownloadButton from './download';

export default function App() {
    const [downloadedData, setDownloadedData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [IsData, setIsData] = useState(false);
    const downloadButtonRef = useRef();

    const handleDataDownload = (data) => {
        setDownloadedData(data);
        setIsData(true);
    };
    const incrementPage = () => {
        setPageNumber(pageNumber + 1)
        console.log(pageNumber)
        downloadButtonRef.current?.getData();
    }
    const decrementPage = () => {
        if (pageNumber < 0) {
            setPageNumber(0)
            setIsData(false)
        }
        else {
            setPageNumber(pageNumber - 1)
        }
        console.log(pageNumber)
        downloadButtonRef.current?.getData();

    }

    return (
        <div className='app'>
            <table>
                <thead>
                    <tr>
                        <th>DATE TIME</th>
                        <th>TICKER</th>
                        <th>OPEN</th>
                        <th>CLOSE</th>
                        <th>HIGH</th>
                        <th>LOW</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                <tbody>
                    {downloadedData.map((item, index) => {
                        return (
                            <tr key={index}>
                                {Object.entries(item).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <td>{value}</td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={incrementPage} disabled={!IsData} id='next-page' >next page</button>
            <button onClick={decrementPage} disabled={!IsData} id= 'last-page'>previous page</button>
            <div>
                <UploadComponent />
                <DownloadButton page={pageNumber} onDownloadData={handleDataDownload} disable={IsData} ref={downloadButtonRef} />
            </div>
        </div>

    );


}


