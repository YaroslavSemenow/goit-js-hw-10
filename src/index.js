import './css/styles.css';
import { debounce, property } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#seach-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

// refs.input.addEventListener('input', OnInput);
const nameCountry = 'ukraine';

fetch(
  `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`,
)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(response => {
    console.log(response);
    response.forEach(({ name, capital, population, flags, languages }) => {
      const countryItemString = `
      <div>
          <img src='${flags.svg}' alt='flags' style='height:20px'> 
          ${name.official}
      </div>
      <div>Capital: ${capital}</div>
      <div>Population: ${population}</div>
      <div>Languages: ${languages}</div>
      `;
      console.log(countryItemString);
      console.log(name.official, capital, population, flags, languages);
      refs.countryInfo.innerHTML = countryItemString;
    });
  })
  .catch(error => console.log(error));
