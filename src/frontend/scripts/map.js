const url = "http://localhost:1234";

// Sets constants for the map
// The "theMarker" is responsible for creating a new pin on the map
// The "circleArea" is responsible for creating a new circle on the map

var theMarker = {};
var circleArea = {};
const latitudeInput = document.querySelector("#lat");
const longitudeInput = document.querySelector("#lng");
let information = {
    streetName: "",
    assistedName: "",
};

// Creates a person icon to be used on the map pre-existing markers

var personFill = L.icon({
    iconUrl: '../../frontend/images/person-fill.svg',

    iconSize:     [30, 30], // size of the icon
});

// Creates a Map centered in those coordinates (-23.578811057501508, -46.565881116593985) and a layerGroup for the markers

var map = L.map('map').setView([-23.578811057501508, -46.565881116593985], 13);
var layerGroup = L.layerGroup().addTo(map);

// Creates the Revirar marker

const REVIRAR = L.marker([-23.578811057501508, -46.565881116593985]).addTo(map).bindPopup("<b>Projeto REVIRAR<br/>Rua Nhengaibas, 356 - Água Rasa.");

// Function to get all the markers from the database

const getMarkers = () => {
    axios
      .get(url + "/api/maps")
      .then((response) => {
        const markers = [];
        response.data.forEach((marker) => {
          markers.push(marker);
        });
  
        console.log(markers);

        // Shows all markers in the database and then creates a new marker for each one

        createMarkers(markers);
      })
      .catch((e) => console.error(e));
};

getMarkers();


const addMarker = () => {

    // Creates a new object with the information from the form
    
    let newMarker = {
        latitude: document.querySelector("#lat").value,
        longitude: document.querySelector("#lng").value,
        streetName: information.streetName,
        assistedName: document.getElementById("assistedName").value,
        circleRadius: document.getElementById("circleRadius").value,
    }


    // Tries to add the new marker to the database

    try {
        axios
          .post('/api/maps', newMarker)
          .then((response) => {
            // If it succeeds, it clears the inputs and gets the new markers from the database
            alert("Local cadastrado com sucesso!");
            getMarkers();
            document.getElementById("assistedName").value = "";
            document.getElementById("circleRadius").value = 250;
          })
          .catch((e) => console.error(e));
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao adicionar o local!");
      }
};


// Function to generate a marker from existing data

function createMarkers(markers){
    markers.map((information) => {
        
        // Creates a marker with a delete button with the id of the marker
        
        L.marker([information.latitude, information.longitude], {icon: personFill}).addTo(layerGroup).bindPopup("<b>" + information.assistedName + "<br/>" + information.streetName + `</b> <br/> <button onclick="deleteLocation(${information.placeId})">Deletar</button>`);
        
        // Creates the cirle with the radius of the marker
        
        L.circle([information.latitude, information.longitude], {
            color: 'yellow',
            fillColor: '#FFF601',
            fillOpacity: 0.5,
            radius: information.circleRadius
        }).addTo(layerGroup);
    });
}

// Defining the map's layers

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 12,
    attribution: '© OpenStreetMap',
}).addTo(map);

// Function to create a marker from clicking on the map

map.on("click", function (event) {

    // Gets all the information from the form

    document.getElementById("nameLabel").hidden = false;
    document.getElementById("assistedName").hidden = false;
    document.getElementById("radiusLabel").hidden = false;
    document.getElementById("circleRadius").hidden = false;
    document.getElementById("btn-add").disabled = false;

    // Defines Latitude and Longitude values

    lat = event.latlng.lat;
    lon = event.latlng.lng;

    latitudeInput.value = lat;
    longitudeInput.value = lon;

    // Sends a request to a API that gets the street name from latitude and longitude

    var jsonQuery = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitudeInput.value + "&lon=" + longitudeInput.value + "&zoom=18&addressdetails=1";

    // When done, it treats the response and sets the attribute streetName in the information object

    $.getJSON(jsonQuery).done( function (result_data) {
        console.log(result_data.address.road);
        if(result_data.address.road != undefined){
            information.streetName = result_data.address.road;
        } 
        else{
            information.streetName = "Não encontrado";
        }
    });

    //Clear existing marker,

    if (theMarker != undefined) {
        map.removeLayer(theMarker);
    }
    if (circleArea != undefined) {
        map.removeLayer(circleArea);
    }

    //Add a marker to show where you clicked.

    circleArea = L.circle([lat, lon], {
        color: 'yellow',
        fillColor: '#FFF601',
        fillOpacity: 0.5,
        radius: document.getElementById("circleRadius").value
    }).addTo(layerGroup);

    information.assistedName = document.getElementById("assistedName").value;

    // Effectively creates the marker

    theMarker = L.marker([lat, lon], {icon: personFill}).addTo(layerGroup).bindPopup("<b>" + information.assistedName + "<br/>" + information.streetName + "</b>").openPopup();
});

// Function to delete a marker

const deleteLocation = (id) =>{
    if (confirm("Deseja mesmo deletar este usuário?")) {
        axios
          .delete(url + "/api/maps/" + id)
          .then((res) => {
            layerGroup.clearLayers();
            getMarkers();
          })
          .catch((e) => console.error(e));
      } else {
        return;
      }
}

// Function to update the radius when the slider is moved

function updateRadius(){
    if (circleArea != undefined) {
        circleArea.setRadius(document.getElementById("circleRadius").value);
    }
}

// Funciton to update the assisted name when the input is changed

function updatePopup(){
    let name = document.getElementById("assistedName").value;
    if (theMarker != undefined) {
        theMarker.setPopupContent("<b>" + name + "<br/>" + information.streetName + "</b>").openPopup();
    }
}