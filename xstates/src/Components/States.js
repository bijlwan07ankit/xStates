import axios from 'axios'
import React from 'react'
import styles from "./States.module.css"
import { useEffect , useState } from 'react'

const States = () => {
  const [countries , setCountries] = useState([])
  const [states , setStates] = useState([])
  const [cities , setCities] = useState([])
  const [selectedCountry,setSelectedCountry] = useState("")
  const [selectedState,setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  useEffect(()=>{
    (async function(){
        try {
          let res = await axios.get("https://crio-location-selector.onrender.com/countries")
          console.log(res.data)
          setCountries(res.data)
        } catch (error) {
          console.log(error)
        }
    })
    ()
  },[])
  // console.log(selectedCountry)
  useEffect(()=>{
    (async function(){
      if (selectedCountry)
      try {
         let res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
         setStates(res.data)
         setSelectedState("")
         setCities([])
         setSelectedCity("")
        } catch (error) {
         console.log(error)
      }
    })
    ()
  },[selectedCountry])
   
   useEffect(()=>{
    (async function () {
      if (selectedCountry && selectedState) {
        try {
          let data = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          setCities(data.data);
          setSelectedCity("");
          //  console.log(data.data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [selectedCountry, selectedState]);
   
  return (
    <div>
      <h1>Select Location</h1>
      <div className={styles.dropDowns}>
        <select className={styles.dropDown} value={selectedCountry} onChange={(e)=> setSelectedCountry(e.target.value)}>
          <option value="">select country</option>
          {countries.map((country)=>(
            <option value={country} key={country}>{country}</option> 
          ))}
        </select>
        <select className={styles.dropDown} value={selectedState} onChange={(e)=> setSelectedState(e.target.value)}>
          <option value="">select country</option>
          {states.map((state)=>(
            <option value={state} key={state}>{state}</option> 
          ))}
        </select>
        <select className={styles.dropDown} value={selectedCity} onChange={(e)=> setSelectedCity(e.target.value)}>
          <option value="">select country</option>
          {cities.map((city)=>(
            <option value={city} key={city}>{city}</option> 
          ))}
        </select>
      </div>
      {selectedCity && selectedState && selectedCountry && (
        <h3>
          <span className={styles.first}> You selected </span>
          <span className={styles.big}>{selectedCity},</span>
          <span className={styles.fade}>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h3>
      )}
    </div>
  )
}

export default States