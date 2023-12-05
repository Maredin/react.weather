import React from 'react';
import './edit.css';

function Edit({ adress, setAdress, gpsCity, setGpsCity, setPopup }) {

    // Добавить новую локацию
    function addLocation(e) {
        e.preventDefault();

        const errorForm = document.querySelector('.edit__form-error');
        errorForm.style.display = 'none';

        let title = document.querySelector('#add__title').value,
            latitude = document.querySelector('#add__latitude').value,
            longitude = document.querySelector('#add__longitude').value;
        if (title && latitude && longitude) {
            const newGPS = {
                key: Math.random(),
                title: title,
                latitude: latitude,
                longitude: longitude
            }
            const newArr = [...gpsCity, newGPS];
            localStorage.date = JSON.stringify(newArr);
            setGpsCity(newArr)

            // Очистить инпуты
            document.querySelector('#add__title').value = '';
            document.querySelector('#add__latitude').value = '';
            document.querySelector('#add__longitude').value = '';

        } else {
            errorForm.style.display = 'block'
        }

    }

    // Удалить локацию
    function removeLocation(e) {

        let newArr = gpsCity.filter((item) => item.key !== e.key);
        localStorage.date = JSON.stringify(newArr);
        setGpsCity(newArr);
    }

    // Валидация инпута
    function inputChange(e) {
        const input = `#${e.target.id}`
        document.querySelector(input).value = document.querySelector(input).value
            .replace(/ /g, ".")
            .replace(/_/g, "-")
            .replace(/\.+/g, ".")
            .replace(/\-+/g, "-")
            .replace(/[^\w.-]|[a-zA-Z]|^[.-]/g, "");

        const errorForm = document.querySelector('.edit__form-error');
        errorForm.style.display = 'none';
    }

    function closeEdit() {
        setPopup(false);
    }

    function Items() {
        const item = gpsCity.map(item =>
            <div className='edit__item' key={item.key} >
                <div className="edit__item-title">{item.title}</div>
                <button className="edit__item-delite" onClick={() => removeLocation(item)}>удалить</button>
            </div>
        )
        return item
    }
    return (
        <div className="popup">

            <div className="edit">
                <div className="popup__exit" onClick={() => closeEdit()}>X</div>
                <Items />

                <form className="edit__form">
                    <p className='edit__form-title'>Добавить новые GPS координаты</p>
                    <input type="text" name="title" id="add__title" placeholder='Название координат' />
                    <input type="text" name="title" id="add__latitude" placeholder='GPS долгота'
                        onChange={(e) => inputChange(e)} />
                    <input type="text" name="title" id="add__longitude" placeholder='GPS широта'
                        onChange={(e) => inputChange(e)} />
                    <button className='edit__form-btn' onClick={(e) => addLocation(e)}>Добавить</button>
                    <p className='edit__form-error'>Ошибка ввода!</p>
                </form>
            </div>
        </div>
    )
}


export default Edit;