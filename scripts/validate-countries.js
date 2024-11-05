import { TOOLS_CONFIGS, getJsonFromUrl } from './common.js';

const { GOOGLE_API_KEY } = TOOLS_CONFIGS;
const languageCode = 'en';

export const splitString = (str) => str.split(',').map((item) => item.trim());

export const getUserCountryName = async (lat, lng) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=${languageCode}&key=${GOOGLE_API_KEY}`;

  const response = await getJsonFromUrl(apiUrl);
  const locationString = response?.plus_code.compound_code;

  return locationString;
};

const checkForRedirect = (list, country, url) => {
  // Check if country is included in the list that comes from the metadata
  if (!list.includes(country)) {
    // eslint-disable-next-line no-console
    console.error('Truck configurator not avaliable for: ', country);
    const completeUrl = window.location.origin + url;
    window.location.replace(completeUrl);
  }
};

export const validateCountries = async (countries, url) => {
  const allowedCountries = splitString(countries);

  const locationSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await getUserCountryName(latitude, longitude);
    if (!response) return;

    const country = (splitString(response).reverse())[0];
    if (country) checkForRedirect(allowedCountries, country, url);
  };
  const locationError = (error) => {
    // eslint-disable-next-line no-console
    console.error('Error: ', error);
  };

  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
};
