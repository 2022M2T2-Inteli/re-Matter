const PORT = 1234;
const url = `http://localhost:${1234}`;

// Creates a Token to prevent default

const TOKEN = "0987654321";

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

// Gets all informations from the HTML form such as the 
// name, nickname, approach date, approach place, stray time, if is being attended, observation and reason

let responsiblesSelect = document.getElementById("responsibles");

let completeName = document.getElementById("completename");
let nickname = document.getElementById("nickname");
let approachDate = document.getElementById("approachDate");
let approachPlace = document.getElementById("place");

let beingAttended = document.getElementById("beingAttended");

let timeSelect = document.getElementById("timeInStreet");
let reason = document.getElementById("reason");
let observation = document.getElementById("observation");


// Function to get the admin name and then render into the form input

const getResponsibles = () => {
  axios
    .get(`${url}/api/${TOKEN}/admin`)
    .then((response) => {

      // Gets all the responsibles from the database and renders them into the form

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

// Renders the responsible name into the form input

const renderResponsibles = (list) => {
  list.map((responsible) => {
    responsiblesSelect.innerHTML += `
    <option value="${responsible.id}">${responsible.name} | ${responsible.username}</option>
    `;
  });
};

// Function to add the informations into the database

const insertAssisted = () => {

  // Creates a new object with the information from the form

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

  // Tries to add the object into the database

  try {
    axios
      .post(`${url}/api/assisted/${assisted}`)
      .then((response) => {

        // If it succeeds, it clears the displays a message for success
        
        alert("Assistido cadastrado com sucesso!");
      })
      .catch((e) => console.error(e));
  } catch (error) {
    console.error(error);
    alert("Preencha todos os campos!");
  }
};
