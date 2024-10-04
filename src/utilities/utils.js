import axios from "axios";

function getCoordinates(city) {
  console.log("Inside get coordinate");
  const apiLocationUrl =
    "https://nominatim.openstreetmap.org/search?addressdetails=1&format=jsonv2&limit=1";

  axios.get(apiLocationUrl + `&city=${city}`).then(
    (response) => {
      console.log(response.data[0].lat);
      // Setting the local storage with lat and long
      localStorage.setItem("lat", response.data[0].lat);
      localStorage.setItem("lon", response.data[0].lon);
      return [response.data[0].lat, response.data[0].lon];
    },
    (error) => {
      console.log(error);
    }
  );
}

function getLocalStorageCoordinate() {
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");

  return {
    lat: lat,
    lon: lon,
  };
}

function getCurrentSetLocation() {
  return localStorage.getItem("city");
}

function CheckLocationInLocalStorage() {
  const city = localStorage.getItem("city");
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");

  if (!city) {
    localStorage.setItem("city", "Alger");
    // make an api call to get the lat and lon
    console.log("City is undefined");
    getCoordinates("Alger");
  } else {
    console.log("City is defined 1");
    if (!lat || !lon || lat === "undefined" || lon === "undefined") {
      // Make an api request to get lat and long
      console.log("City is defined");
      getCoordinates(city);
    }
  }
}

export {
  getCoordinates,
  CheckLocationInLocalStorage,
  getLocalStorageCoordinate,
  getCurrentSetLocation,
};
