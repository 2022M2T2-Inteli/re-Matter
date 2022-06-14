const url = "http://localhost:5555";
const TOKEN = "0987654321";

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

let responsiblesSelect = document.getElementById("responsibles");

let completeName = document.getElementById("completename");
let nickname = document.getElementById("nickname");
let approachDate = document.getElementById("approachDate");
let approachPlace = document.getElementById("place");

let beingAttended = document.getElementById("beingAttended");

let timeSelect = document.getElementById("timeInStreet");
let reason = document.getElementById("reason");
let observation = document.getElementById("observation");

const getResponsibles = () => {
  axios
    .get(url + `/api/${TOKEN}/admin`)
    .then((response) => {
      const responsibles = [];
      response.data.forEach((responsible) => {
        responsibles.push({
          id: responsible.adminId,
          name: responsible.name,
          username: responsible.username,
        });
      });

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
    name: completeName.value || "",
    nickname: nickname.value,
    place: approachPlace.value,
    time: timeSelect.value,
    approachDate: new Date(approachDate.value).toLocaleDateString(),
    beingAttended: beingAttended.value === "1" ? true : false,
    observation: observation.value || "",
    reason: reason.value || "Não especificado",
    responsibleId: parseInt(responsiblesSelect.value),
    createdAt: new Date(Date.now()).toLocaleDateString(),
  };

  try {
    axios
      .post(url + "/api/assisted", assisted)
      .then((response) => {
        alert("Assistido cadastrado com sucesso!");
      })
      .catch((e) => console.error(e));
  } catch (error) {
    console.error(error);
    alert("Preencha todos os campos!");
  }
};
