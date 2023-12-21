import './app.css';
import Header from "../Header/Header";
import Main from '../Main/Main';
import React, { useState } from 'react';
import Edit from '../Edit/Edit';

function App() {
    const [adress, setAdress] = useState('Глумилинская');
    const [popup, setPopup] = useState(false);
    const newGPS = [{
        key: Math.random(),
        title: 'Глумилинская',
        latitude: 54.7738297171387,
        longitude: 56.03919982910157
    }]

    if (!JSON.parse(localStorage.getItem('weather'))) {
        localStorage.weather = JSON.stringify(newGPS)
    }


    const [gpsCity, setGpsCity] = useState(JSON.parse(localStorage.getItem('weather')) || ''
    );
    const [errorGps, setErrorGps] = useState(false);

    return (
        <>
            <Header adress={adress} setAdress={setAdress} gpsCity={gpsCity} setGpsCity={setGpsCity} setPopup={setPopup} setErrorGps={setErrorGps} />

            {gpsCity && gpsCity.length && !errorGps > 0 ? <Main adress={adress} gpsCity={gpsCity} setGpsCity={setGpsCity} setErrorGps={setErrorGps} /> : ''}

            {popup ? <Edit adress={adress} setAdress={setAdress} gpsCity={gpsCity} setGpsCity={setGpsCity} setPopup={setPopup} /> : ''}
        </>
    )
}

export default App;