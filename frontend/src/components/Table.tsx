import "./Table.css";
import { useEffect, useState } from "react";

//For redux
import {useSelector} from 'react-redux'
import type {RootState} from '../index'

//Importing some decorativ icons
import {FaCity} from 'react-icons/fa'
import {FaGlobeAmericas} from 'react-icons/fa'
import {FiMinus} from 'react-icons/fi'
import {BsFillGeoFill} from "react-icons/bs"


type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

export const Table = () => {
  
  const [cities, setCities] = useState<City[] | null>(null);

  //Chosen country (value from a button that has been clicked)
  const targetCountry = useSelector((state : RootState) => state.city); //To get the value from the redux container

  //Getting
  useEffect(() => {
    fetch("http://localhost:3001/api/cities")
      .then((response) => response.json())
      .then(setCities);
  }, []);
  

  //Function to print the table
  function printTable (){

    //If the button clicked is not "All cities" --> filter and display the data corresponding to the selected
    if (targetCountry !== "All cities"){
      return (cities?.filter(city => city.country === targetCountry).map((city, index) => (
        <tr key={index}>
          <td className="city_column">{city.name}</td>
          <td>{city.country} </td>
          <td>{city.subcountry} </td>
          <td><a href = {"https://www.geonames.org/" +city.geonameid+"/"} target = "_blank"> Geoname page</a></td>
        </tr>
 )))
    } 
    //If the button clicked is "All_cities" --> then it just display the full table with all the cities
    else {
      return( cities?.map((city, index) => (
          <tr key={index}>
            <td className="city_column">{city.name}</td>
            <td>{city.country} </td>
            <td>{city.subcountry} </td>
            <td><a href = {"https://www.geonames.org/" +city.geonameid+"/"} target = "_blank"> Geoname page</a></td>
          </tr>))   
       ) }
  }


  return (
    <div id="cities-table-wrapper">
      <h3>All the cities : </h3>
      <h1>{ targetCountry !== "All cities" ? "of " + targetCountry.toUpperCase() : ""}</h1>
      <table>
        <thead>
          <tr>
            <th> <FaCity /> City</th>
            <th> <FaGlobeAmericas /> Country</th>
            <th> <FiMinus /> Sub-country</th>
            <th> <BsFillGeoFill /> Geo-link</th>
          </tr>
        </thead>
        <tbody>
          {printTable()}
        </tbody>
      </table>
    </div>
  );
};
