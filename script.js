let sinput = document.getElementById("searchInput");
let sbtn = document.getElementById("searchBtn");
let loc ={};
let resShow = document.getElementById("weatherResults");

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat="+crd.latitude+"&lon="+crd.longitude+"")  .then((response) => response.json())
    .then((data) => {
        console.log(data);

    });

    fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat="+crd.latitude+"&lon="+crd.longitude+"") .then((response) => response.json())
    .then((data) => {
        console.log(data);
        loc = data;
        let node = document.createElement('p');
        node.textContent = "Your Current location : "+loc.display_name;
        resShow.appendChild(node)
    });
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);