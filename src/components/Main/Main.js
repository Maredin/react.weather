import './main.css';
import React, { useEffect, useState } from 'react';

import sun from './img/sun.png';
import cloudy from './img/cloudy.png';
import rain from './img/rain.png';
import snow from './img/snow.png';
import thunder from './img/thunder.png';

function Main({ adress, gpsCity }) {
    const [data, setData] = useState();
    const [gpsCityTitle, setGpsCityTitle] = useState(gpsCity[0]);

    // Вшитые координаты
    const gps = gpsCity;

    // Смена координат
    useEffect(() => {
        for (let i = 0; i < gps.length; i++) {
            if (gps[i].title === adress) {
                let newArr = gps[i];
                setGpsCityTitle(newArr)
            }
        }
    }, [adress])



    // Фетч запрос к API
    useEffect(() => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${gpsCityTitle.latitude}&longitude=${gpsCityTitle.longitude}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=auto`;


        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
    }, [gpsCityTitle.latitude, gpsCityTitle.longitude]);

    // Направление ветра
    const windsDeg = data ? data.current.wind_direction_10m : '';

    let winddirection = '';

    if (windsDeg >= 0 && windsDeg < 45) {
        winddirection = 'Северный'
    } else if (windsDeg === 45) {
        winddirection = 'Северо-Восточный'
    } else if (windsDeg > 45 && windsDeg < 135) {
        winddirection = 'Восточный'
    } else if (windsDeg === 135) {
        winddirection = 'Юго-Восточный'
    } else if (windsDeg > 135 && windsDeg < 225) {
        winddirection = 'Южный'
    } else if (windsDeg === 225) {
        winddirection = 'Юго-Западный'
    } else if (windsDeg > 225 && windsDeg < 315) {
        winddirection = 'Западный'
    } else if (windsDeg === 315) {
        winddirection = 'Северо-Западный'
    } else if (windsDeg > 315 && windsDeg <= 360) {
        winddirection = 'Северный'
    } else {
        winddirection = 'error'
    }

    // Код оасдков погоды
    let imgWeather = '';
    const imgWeatherData = data ? data.current.weather_code : '';
    if (imgWeatherData >= 0 && imgWeatherData <= 3) {
        imgWeather = sun;
    } else if (imgWeatherData >= 45 && imgWeatherData <= 48) {
        imgWeather = cloudy;
    } else if (imgWeatherData >= 51 && imgWeatherData <= 67) {
        imgWeather = rain;
    } else if ((imgWeatherData >= 71 && imgWeatherData <= 77) || (imgWeatherData >= 85 && imgWeatherData <= 86)) {
        imgWeather = snow;
    } else if ((imgWeatherData >= 80 && imgWeatherData <= 82) || imgWeatherData >= 95) {
        imgWeather = thunder;
    }


    function Week() {

        const weekData = data ? data.daily.time : '';

        const imgWeatherData = data ? data.daily.weather_code : '';
        const tempMax = data ? data.daily.temperature_2m_max : '';
        const tempMin = data ? data.daily.temperature_2m_min : '';
        const weekDirection = data ? data.daily.wind_direction_10m_dominant : '';
        const weekWindSpeed = data ? data.daily.wind_speed_10m_max : '';

        if (weekData && imgWeatherData && tempMax && tempMin && weekDirection && weekWindSpeed) {

            // Функция изображения погоды
            let newArrWeek = weekData.slice(1, weekData.length);
            function imgArr(i) {
                let imgWeather = '';
                if (imgWeatherData[i] >= 0 && imgWeatherData[i] <= 3) {
                    imgWeather = sun;
                } else if (imgWeatherData[i] >= 45 && imgWeatherData[i] <= 48) {
                    imgWeather = cloudy;
                } else if (imgWeatherData[i] >= 51 && imgWeatherData[i] <= 67) {
                    imgWeather = rain;
                } else if ((imgWeatherData[i] >= 71 && imgWeatherData[i] <= 77) || (imgWeatherData[i] >= 85 && imgWeatherData[i] <= 86)) {
                    imgWeather = snow;
                } else if ((imgWeatherData[i] >= 80 && imgWeatherData[i] <= 82) || imgWeatherData[i] >= 95) {
                    imgWeather = thunder;
                }
                return imgWeather
            }



            function weekWind(i) {
                let winddirection = '';
                const windsDeg = data ? data.daily.wind_direction_10m_dominant : '';

                if (windsDeg[i] >= 0 && windsDeg < 45) {
                    winddirection = 'Северный'
                } else if (windsDeg[i] === 45) {
                    winddirection = 'Северо-Восточный'
                } else if (windsDeg[i] > 45 && windsDeg[i] < 135) {
                    winddirection = 'Восточный'
                } else if (windsDeg[i] === 135) {
                    winddirection = 'Юго-Восточный'
                } else if (windsDeg[i] > 135 && windsDeg[i] < 225) {
                    winddirection = 'Южный'
                } else if (windsDeg[i] === 225) {
                    winddirection = 'Юго-Западный'
                } else if (windsDeg[i] > 225 && windsDeg[i] < 315) {
                    winddirection = 'Западный'
                } else if (windsDeg[i] === 315) {
                    winddirection = 'Северо-Западный'
                } else if (windsDeg[i] > 315 && windsDeg[i] <= 360) {
                    winddirection = 'Северный'
                } else {
                    winddirection = 'error'
                }
                return winddirection;
            }

            const weekItems = newArrWeek.map((item, i) =>
                <div className="main__today main__week" key={Math.random()}>
                    <p className='main__today-city'>{item.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1")}</p>

                    <img src={imgArr(i)} alt="imgWeather" className='main__today-img' />

                    <p className='main__today-time'>t° День: <span className='black'>{data ? (data.daily.temperature_2m_max[i])
                        : "--"}°</span></p>

                    <p className='main__today-time'>t° Ночь: <span className='black'>{data ? (data.daily.temperature_2m_min[i])
                        : "--"}°</span></p>

                    <p className='main__today-time main__week-wind'>Ветер: <br /><span className='black'> {weekWind(i)}:  {data ? data.daily.wind_speed_10m_max[i]
                        : "--"} м/с</span></p>
                </div>
            );
            return weekItems;
        }

    }

    return (
        <section className="main">
            <div className="main__today">
                <p className='main__today-city'>{adress}</p>
                <img src={imgWeather} alt="imgWeather" className='main__today-img' />
                <p className="main__today-temp">{data ? data.current.temperature_2m
                    : "--"}°</p>
                <p className='main__today-data'>Сегодня</p>
                <p className='main__today-time'>Время: <span className='black'>{data ? (data.current.time).slice(11, 16)
                    : "--"}</span></p>
                <p className='main__today-time'>Ветер:<br /><span className='black'> {winddirection}:   {data ? data.current.wind_speed_10m
                    : "--"} м/с</span></p>
            </div>

            <div className="wrapper__week">
                <Week />
            </div>
        </section>

    )
}

export default Main;