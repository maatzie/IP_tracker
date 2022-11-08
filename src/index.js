
import {addTileLayer, validateIp} from "./helpers";
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const mapArea = document.querySelector('.map');
const map = L.map('map').setView([51.505, -0.09], 13);
addTileLayer(map);
var customIcon = L.icon({
    iconUrl: icon,
    iconSize:     [30, 40], // size of the icon
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const marker = L.marker([51.5, -0.09], {icon:customIcon}).addTo(map);

function getData() {
    // check data
    if(validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_jnoEWLr0Oxbw5Ju6h6nb3q3BWtXhS&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(setInfo);
    }

}

function handleKey(event) {
    if(event.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    console.log(mapData);
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([mapData.location.lat, mapData.location.lng]);
    L.marker([mapData.location.lat, mapData.location.lng], {icon:customIcon}).addTo(map);
}