import './app.css';
import Header from "../Header/Header";
import Main from '../Main/Main';
import React, { useState } from 'react';
import Edit from '../Edit/Edit';

function App() {
    const [adress, setAdress] = useState('Глумилинская');
    const [popup, setPopup] = useState(false);

    /*     const [gpsCity, setGpsCity] = useState([
            {
                key: Math.random(),
                title: 'Глумилинская',
                latitude: 54.773876130498884,
                longitude: 56.03922128677369
            },
            {
                key: Math.random(),
                title: 'Мулино',
                latitude: 55.757560879505874,
                longitude: 55.4439264535904
            },
            {
                key: Math.random(),
                title: 'Булгаково',
                latitude: 54.47938879436716,
                longitude: 55.88260173797608
            },
        ]); */

    const [gpsCity, setGpsCity] = useState(JSON.parse(localStorage.getItem('date')) || '');

    return (
        <>
            <Header adress={adress} setAdress={setAdress} gpsCity={gpsCity} setGpsCity={setGpsCity} setPopup={setPopup} />

            {gpsCity ? <Main adress={adress} gpsCity={gpsCity} setGpsCity={setGpsCity} /> : ''}

            {popup ? <Edit adress={adress} setAdress={setAdress} gpsCity={gpsCity} setGpsCity={setGpsCity} setPopup={setPopup} /> : ''}
        </>
    )
}

export default App;