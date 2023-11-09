import './app.css';
import Header from "../Header/Header";
import Main from '../Main/Main';
import React, { useState } from 'react';

function App() {
    const [adress, setAdress] = useState('Глумилинская');
    const [gpsCity, setGpsCity] = useState([{
        key: Math.random(),
        title: 'Глумилинская',
        latitude: 54.7431,
        longitude: 55.9678
    },
    {
        key: Math.random(),
        title: 'Мулино',
        latitude: 55.757379,
        longitude: 55.9678
    },
    {
        key: Math.random(),
        title: 'Булгаково',
        latitude: 54.479125,
        longitude: 55.880410
    },
    ]);
    return (
        <>
            <Header adress={adress} setAdress={setAdress} gpsCity={gpsCity} />
            <Main adress={adress} gpsCity={gpsCity} setGpsCity={setGpsCity} />
        </>
    )
}

export default App;