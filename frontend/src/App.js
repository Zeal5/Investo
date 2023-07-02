import React, { useState } from 'react';
import './App.css';
import UploadComponent from './upload';

export default function App() {

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
                    <tr>
                        <td>Date</td>
                        <td>btcusdt</td>
                        <td>1234</td>

                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>
                         <tr>
                        <td>Date</td>
                        <td>btcusdt</td>
                        <td>1234</td>

                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>
                         <tr>
                        <td>Date</td>
                        <td>btcusdt</td>
                        <td>1234</td>

                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>
                         <tr>
                        <td>Date</td>
                        <td>btcusdt</td>
                        <td>1234</td>

                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>

                </tbody>
            </table>
            <UploadComponent />
        </div>

    );


}

