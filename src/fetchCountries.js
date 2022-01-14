export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1/name';
const queryStringParameters = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?${queryStringParameters}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
