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

function getCurrentSetCity() {
  return localStorage.getItem("city");
}

function getCurrentSetWilaya() {
  return localStorage.getItem("wilaya");
}

function CheckLocationInLocalStorage() {
  const wilaya = localStorage.getItem("wilaya");
  const city = localStorage.getItem("city");

  if (!city || !wilaya) {
    localStorage.setItem("city", "Alger");
    localStorage.setItem("wilaya", "Alger");
    // make an api call to get the lat and lon
    getCoordinates("Alger");
  } else {
    // Make an api request to get lat and long
    getCoordinates(city);
  }
}

// Load list of wilayas
function getWilayaList() {
  return new Promise((resolve, reject) => {
    axios
      .get("/algeria_cities.json")
      .then((response) => {
        const list_of_wilayas = [];
        response.data.forEach((element) => {
          if (!list_of_wilayas.includes(element.wilaya_name_ascii)) {
            list_of_wilayas.push(element.wilaya_name_ascii);
          }
        });
        resolve(list_of_wilayas);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getBaladiaList(wilaya) {
  return new Promise((resolve, reject) => {
    axios
      .get("/algeria_cities.json")
      .then((response) => {
        const list_of_baladias = [];
        response.data.forEach((element) => {
          if (
            !list_of_baladias.includes(element.commune_name_ascii) &&
            element.wilaya_name_ascii === wilaya
          ) {
            list_of_baladias.push(element.commune_name_ascii);
          }
        });
        resolve(list_of_baladias);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function saveLocation(currentWilaya, currentCity) {
  localStorage.setItem("city", currentWilaya);
  localStorage.setItem("wilaya", currentCity);
  CheckLocationInLocalStorage();
}

export {
  getCoordinates,
  CheckLocationInLocalStorage,
  getLocalStorageCoordinate,
  getCurrentSetCity,
  getCurrentSetWilaya,
  getWilayaList,
  getBaladiaList,
  saveLocation,
};
