
import "./style/style.css"
import React, { useState, useEffect } from 'react'
///////////////////////
// testing
// import Data from './data.json'

const MainPart = ()=>{

    const [RStatus, setRStatus] = useState("");
    const [city, setCity] = useState("");
    const [cityname, setCityname] = useState("");
    const [searchcity, setSearchcity] = useState("Durgapur");
    const [TypedCity, setTypedCity] = useState("Durgapur");

    const submitHandler = (e)=>{
        e.preventDefault();
        if (TypedCity) {
            setSearchcity(TypedCity);
        }
    }

    // FETCH API 
    useEffect(()=>{
        const fetchAPI = async()=>{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=676c605eb8ddc317783f91dd9cb8f02d&units=metric`;
            const response = await fetch(url);

            setRStatus(response.statusText);

            if (response.status>=200||response.status<300) {
                const json = await response.json();
                setCity(json.main);
                setCityname(json.name);
            }
            else{
                const json = await response.json();
                setCity("");
            }

            // //////////////////////////////
            // testing works: ---- 

            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=676c605eb8ddc3f17783f91dd9cb8f02d&units=metric`;
            
            // console.log("searching")
            // const url = `./data.json`;
            // const json = {Data};
            // console.log(json);
            
            // setCityname(json.Data.name);
            // setCity(json.Data.main);
            // console.log(cityname);
            // console.log(city);

        };
        fetchAPI();
    },[searchcity])

    return(
        <>
        <div className="box">
            <form action="" onSubmit={submitHandler}>
            <div className="inputData">
            <input value={TypedCity} onChange={e=>setTypedCity(e.target.value)} type="search" className="inputField"/>
            </div>
            <div className="btnholder">
            <button id="btn" type="submit">Search</button>
            </div>
            </form>
        {city?
        <div className="info float">
            <h4 className="location ">
            <i className="fas fa-street-view fa-sm "></i>{` `}{cityname}
            </h4>
            <h4 className="feel">
                Feels like:{city.feels_like}&deg;c
            </h4>
            <h1 className="temp">
            {city.temp} &deg;c
            </h1>
            <h3 className="tempmin_max">
            Min: {city.temp_min}&deg;c | Max:{city.temp_max}&deg;c
            </h3>
            <h4>
                Humidity:{city.humidity}
            </h4>
            <h4>
                Pressure:{city.pressure}
            </h4>
        </div>:
        <div className="info">
            <h4 className="location">
                No data found.
            </h4>
            <h4>
                Error:{RStatus}
            </h4>
        </div>
        }

        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
        </div>
        </>
    )
}

export default MainPart;