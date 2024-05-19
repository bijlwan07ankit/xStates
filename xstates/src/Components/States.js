import ract from "react"
import axios from "axios"
import {useState,useEffect} from "react"
import styles from "../Components/States.module.css"
export default function States(){

const [country,setCountry]=useState([]);
const [state,setState]=useState([]);
const [city,setCity]=useState([]);

    useEffect(()=>{
    fetchData();
    },[]
    )

    const fetchData= async ()=>{
      
      try{
      const countryName= await axios.get("https://crio-location-selector.onrender.com/countries");
      console.log(countryName.data)
      }
      catch(error){
        console.log("error fetching data",error)
      }    
      try{
       let stateName=await axios.get(" https://crio-location-selector.onrender.com/country={countryName}/states")
       console.log(stateName.data)
      }
      catch(error){
        console.log("error fetching data",error)
      }
     try{
        let cityName= await axios.get(" https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities")
        console.log(cityName.data)  
     }
     catch(error){
        console.log("error fetching data",error)

    }}

    return (
        <>
        <h1>Select Location</h1>
        <select className={styles.DropDown} id={styles.country}>
            <option value="abc">Select the country</option>
        </select>
        <select className={styles.DropDown}>
            <option value ="Select the state">Select the state</option>
        </select>
        <select className={styles.DropDown}>
            <option value="Select city">Select city</option>
        </select>
        </>
    )
}