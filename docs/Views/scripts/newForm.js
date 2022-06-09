const url = "http://127.0.0.1:5555";
const TOKEN = process.env.TOKEN || "0987654321";

let responsiblesSelect = document.getElementById("responsibles");

let completeName = document.getElementById("completename");
let nickname = document.getElementById("nickname");
let approachPlace = document.getElementById("place");

let attendanceYes = document.getElementById("attendanceYes");
let attendanceNo = document.getElementById("attendanceNo");

let timeSelect = document.getElementById("timeInStreet");
let reason = document.getElementById("reason");

const getResponsibles = () => {
  axios
    .get(url + `/api/${TOKEN}/admin`)
    .then((response) => {
      const responsibles = [];
      response.data.forEach((responsible) => {
        responsibles.push({
          id: responsible.id,
          name: responsible.name,
          username: responsible.username,
        });
      });
      console.log(responsibles);

      renderResponsibles(responsibles);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getResponsibles();

const renderResponsibles = (list) => {
  list.map((responsible) => {
    responsiblesSelect.innerHTML += `
    <option value="${responsible.id}">${responsible.name} | ${responsible.username}</option>
    `;
  });
};

const insertAssisted = () => {
  let assisted = {
    name: completeName.value,
    nickname: nickname.value,
    place: approachPlace.value,
    attendance: attendanceYes.checked ? "yes" : "no",
  };

  axios
    .post(url + "/api/assisted", assisted)
    .then((response) => {
      console.log(response);
      window.location.href = "/fichas-existentes";
    })
    .catch((e) => console.error(e));
};
