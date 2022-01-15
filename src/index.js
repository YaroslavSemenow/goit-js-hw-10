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
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  const country = e.target.value.trim();
  if (!country) {
    return;
  }

  fetchCountries(country)
    .then(ref => {
      if (ref.length === 1) {
        countryInfoMarkup(ref);
      } else if (2 <= ref.length && ref.length <= 10) {
        countryListMarkup(ref);
      } else {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}

function countryInfoMarkup(country) {
  country.forEach(({ name, capital, population, flags, languages }) => {
    refs.countryInfo.innerHTML = `
      <h1>
          <img src='${flags.svg}' alt='flags' style='height:20px'>
          ${name.official}
      </h1>
      <p><span class='subtitle'>Capital:</span> ${capital.join(', ')}</p>
      <p><span class='subtitle'>Population:</span> ${population}</p>
      <p><span class='subtitle'>Languages:</span> ${Object.values(languages).join(', ')}</p>
      `;
  });
}

function countryListMarkup(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
    <li>
      <img src='${flags.svg}' alt='flags' style='height:20px'>
      ${name.official}
    </li>
    `;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', markup);
}
