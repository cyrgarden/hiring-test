import "./Sidebar.css";
import { useEffect, useState } from "react";

//Imports needed to make redux works
import {useDispatch} from 'react-redux'


type Country = {
  name: string;
  count: number;
};


export const Sidebar = () => {

  //Redux 
  const dispatch = useDispatch();

  //Country - API data and list of countries
  const [countries, setCountries] = useState<Country[] | null>(null);

  //Hook to say which contry is selected --> by default "All cities"
  const [selectedCountry, setSelectedCountry] = useState("All cities");

  //Hook for the searchbar
  const [query, setQuery] = useState(""); 


  useEffect(() => {
    fetch("http://localhost:3001/api/countries")
      .then((response) => response.json())
      .then(setCountries);
  }, []);


  //This function changes the state of selected country
  //then send this value in the redux "ForListReducer.js"
  //so "Table.tsx" can be modified according to that value
  function getCountryName (e){
    setSelectedCountry(e.currentTarget.textContent?.split("(")[0]+ "");
    
    //Sending to redux part
    dispatch({ 
      type : 'GET', 
      city : e.currentTarget.textContent?.split("(")[0],

    })
  }

  //Used to display the number of cities next to the country
  //exemple : France (233) / Japan(452)...
  const city_count = () => {
    let temp =0;
    countries?.map((country)=> {
      temp += country.count;
    });
    return temp;
  }
  
  //Function to display the list of all the "country_button"
  //IF nothing is wrote in the searchbar all the buttons will be displayed
  //ELSE, only countryèbutton that match the searchbar content will be displayed
  function display_countries_btn(){
    
    return(
    countries?.filter(country => {
      if (query ===""){
        return country;
      } else if (country.name.toLowerCase().includes(query.toLocaleLowerCase())){
        return country;
      }
    }).map((country) => ( 
        <button className={selectedCountry === country.name ? 'country_button-active' : "country_button"} 
        onClick={(e) => getCountryName(e) }>{country.name}<small>({country.count}</small>)</button>
      )))}
  


  return (
    <div id="sidebar">
      <h2 id="title">Cities App</h2>
      <hr></hr>
      <h2>Menu</h2>
      <button id= "all_countries-btn" className={selectedCountry === "All cities" ? 'country_button-active' : "country_button"}
          onClick={(e) => getCountryName(e)}>All cities<small>({city_count()})</small>
        </button>
      <form className="form-wrapper">   
        <input placeholder="France..." type="text" onChange={(e) => setQuery(e?.target.value)}/>
      </form>
      <div className="country-list">
        
        {display_countries_btn()}
      </div>
    </div>
  );
};
