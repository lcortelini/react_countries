import React, { useEffect, useState } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/countries/header/Header';

export default function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');


  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      let allCountries = await res
        .json();

      allCountries = allCountries.map(({ translations, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name: translations.br,
          filterName: translations.br.toLowerCase(),
          flag,
          population,
        }
      })

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries))
    }

    getCountries();
  }, [])


  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((acc, index) => {
      return acc + index.population;
    }, 0);

    return totalPopulation;
  }

  const handleChangeFilter = (newText) => {

    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>React Countries</h1>

      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />

      <Countries countries={filteredCountries} />
    </div>
  )
}
