import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(OnInput, DEBOUNCE_DELAY));

function OnInput(e) {
  const country = e.target.value.trim();
  if (!country) {
    return;
  }

  console.log(country);

  fetchCountries(country)
    .then(ref => console.log(ref))
    .catch(error => console.log(error));
}

function countryInfoMarkup(country) {
  country.forEach(({ name, capital, population, flags, languages }) => {
    refs.countryInfo.innerHTML = `
      <div>
          <img src='${flags.svg}' alt='flags' style='height:20px'>
          ${name.official}
      </div>
      <div>Capital: ${capital.join(', ')}</div>
      <div>Population: ${population}</div>
      <div>Languages: ${Object.values(languages).join(', ')}</div>
      `;
  });
}
