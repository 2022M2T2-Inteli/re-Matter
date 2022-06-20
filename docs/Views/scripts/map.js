const url = "http://localhost:5555";
var theMarker = {};
var circleArea = {};
const latitudeInput = document.querySelector("#lat");
const longitudeInput = document.querySelector("#lng");
let information = {
    streetName: "",
    assistedName: "",
};

var personFill = L.icon({
    iconUrl: '../../Views/images/person-fill.svg',

    iconSize:     [30, 30], // size of the icon
});

var map = L.map('map').setView([-23.578811057501508, -46.565881116593985], 13);
var layerGroup = L.layerGroup().addTo(map);

const REVIRAR = L.marker([-23.578811057501508, -46.565881116593985]).addTo(map).bindPopup("<b>Projeto REVIRAR<br/>Rua Nhengaibas, 356 - Água Rasa.");

const getMarkers = () => {
    axios
      .get(url + "/api/maps")
      .then((response) => {
        const markers = [];
        response.data.forEach((marker) => {
          markers.push(marker);
        });
  
        console.log(markers);

        createMarkers(markers);
      })
      .catch((e) => console.error(e));
};

getMarkers();


const addMarker = () => {

    let newMarker = {
        latitude: document.querySelector("#lat").value,
        longitude: document.querySelector("#lng").value,
        streetName: information.streetName,
        assistedName: document.getElementById("assistedName").value,
        circleRadius: document.getElementById("circleRadius").value,
    }

    try {
        axios
          .post('/api/maps', newMarker)
          .then((response) => {
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

function createMarkers(markers){
    markers.map((information) => {
        L.marker([information.latitude, information.longitude], {icon: personFill}).addTo(layerGroup).bindPopup("<b>" + information.assistedName + "<br/>" + information.streetName + `</b> <br/> <button onclick="deleteLocation(${information.placeId})">Deletar</button>`);
        L.circle([information.latitude, information.longitude], {
            color: 'yellow',
            fillColor: '#FFF601',
            fillOpacity: 0.5,
            radius: information.circleRadius
        }).addTo(layerGroup);
    });
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 12,
    attribution: '© OpenStreetMap',
}).addTo(map);


map.on("click", function (event) {

    document.getElementById("nameLabel").hidden = false;
    document.getElementById("assistedName").hidden = false;
    document.getElementById("radiusLabel").hidden = false;
    document.getElementById("circleRadius").hidden = false;
    document.getElementById("btn-add").disabled = false;

    lat = event.latlng.lat;
    lon = event.latlng.lng;

    latitudeInput.value = lat;
    longitudeInput.value = lon;

    var jsonQuery = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitudeInput.value + "&lon=" + longitudeInput.value + "&zoom=18&addressdetails=1";

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

    theMarker = L.marker([lat, lon], {icon: personFill}).addTo(layerGroup).bindPopup("<b>" + information.assistedName + "<br/>" + information.streetName + "</b>").openPopup();
});

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

function updateRadius(){
    if (circleArea != undefined) {
        circleArea.setRadius(document.getElementById("circleRadius").value);
    }
}

function updatePopup(){
    let name = document.getElementById("assistedName").value;
    if (theMarker != undefined) {
        theMarker.setPopupContent("<b>" + name + "<br/>" + information.streetName + "</b>").openPopup();
    }
}