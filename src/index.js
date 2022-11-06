import {validateIp} from "./helpers"

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    // check data
    if(validateIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_jnoEWLr0Oxbw5Ju6h6nb3q3BWtXhS&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(console.log);
    }

}

function handleKey(event) {
    if(event.key === 'Enter') {
        getData();
    }
}