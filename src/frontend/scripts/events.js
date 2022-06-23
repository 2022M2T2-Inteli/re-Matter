const PORT = 1234;
const url = `http://localhost:${1234}`;

document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", (e) => e.preventDefault());

const image_input = document.querySelector("#image");

let uploaded_image;

image_input.addEventListener("change", function () {
  const reader = new FileReader();

  const displayImage = document.querySelector("#display-image");

  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    displayImage.style.backgroundImage = `url(${uploaded_image})`;
    displayImage.style.resize = "cover";
    document.getElementById("123");
  });
  reader.readAsDataURL(this.files[0]);
});

// Function to get events from the database

const getEvents = () => {
  axios
    .get(url + `/api/events`)
    .then((response) => {

      // If it succeeds, it pushes the events to the array

      const events = [];
      response.data.forEach((event) => {
        events.push(event);
      });

      document.getElementById("resultado").innerHTML = "";

      // Render the events

      renderEvents(events);

      return response.data;
    })
    .catch((e) => console.error(e));
};
getEvents();

// Function that render all the events goten in the database

const renderEvents = (list) => {
  const table = document.getElementById("resultado");

  // Checks if the list is empty
  // If it isn't, it creates a row for every event
  // If it is, it creates a row with a message

  list.length > 0
    ? list.map((event) => {
        const { eventId, title, description, date } = event;

        table.innerHTML += `
          <tr data-bs-toggle="modal" data-bs-target="#exampleModal${eventId}" id="tableRow">
            <td class="fs-6">${title}</td>
            <td class="fs-6 col-sm-none col-md-12">${description}</td>
            <td class="fs-6">${date}</td>
          </tr>
          
          ${eventModal(event)}
        `;
      })
    : (table.innerHTML = `
        <tr>
          <td class='fs-6 align-middle'>Nenhum evento encontrado</td>
          <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
          <td class="d-xs-none d-md-block"><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
        </tr>
      `);
};


// Creates a modal for each event

const eventModal = (event) => {
  const { eventId, title, description, imageUrl, date } = event;

  return `
    <div class="modal fade" id="exampleModal${eventId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-3" id="exampleModalLabel">
              #${eventId}
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
              
                <!-- Title sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Titulo</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="eventName${eventId}" disabled=true value="${title}"></input>
                    </div>
                  </div>
                </div>

                <!-- Description sec -->
                <div class="form-group mb-2">
                <label for="image" class="fs-4">Descrição</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input placeholder="Evento da comunidade..." class="form-control border" id="eventDescription${eventId}" style="min-height: 150px;" disabled=true value="${description}"></input>
                    </div>
                  </div>
                </div>

                <!-- Image sec -->
                <div class="form-group mb-2">
                <label for="image" class="mt-1 mb-0 fs-4">
                  <label for="image" class="fs-4">Imagem</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="file" name="image" id="eventImage${eventId}" class="form-control-file" accept="image/png, image/jpeg, image/jpg" disabled='true'></input>
                      <div id="display-image${eventId}" class="col-12 border" style="
                        min-height: 500px; 
                        background-image: url(${imageUrl});
                        background-size: cover;
                      "></div>
                    </div>
                  </div>
                </div>

                <!-- Date sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Data</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="eventDate${eventId}" disabled=true value="${date}" type='date'></input>
                    </div>
                  </div>
                </div>

              </div>
              <div class='col-12 mt-2 d-flex justify-content-center align-items-center'>
                  <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${eventId});">
                    <span id="btnText${eventId}" class="fs-6">Habilitar edição </span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </button>
                </div>
            </div>
          </div>    
          

          <div class="modal-footer">
            <button type="button" class="btn btn-warning mx-auto" onclick="updateEvent(${eventId});" id="updateButton${eventId}" data-bs-dismiss="modal" disabled='true'>Atualizar</button>

            <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between"
              data-bs-dismiss="modal"
            onclick="deleteEvent(${eventId})">
              Deletar 
              <img src="../../Views/images/trash-2.svg" alt="Deletar" height="16" class="d-inline-block align-text-top" />
            </button>
            
            <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Function to insert a event in the database

const insertEvent = () => {

  // Get the values from the form

  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let date = document.getElementById("date");

  // Creates a new event object

  let event = {
    title: title.value,
    description: description.value,
    date: date.value,
    imageUrl: uploaded_image,
  };

  // Checks if the event is valid and then tries to insert it in the database

  if (event.title !== "" || event.description !== null) {
    axios
      .post(url + `/api/events`, event)
      .then((res) => {

        // If the event is inserted successfully, it gets the events from the database to render them in the page

        alert("Evento adicionado com sucesso!");
        getEvents();  
      })
      .catch((e) => console.error(e));
  } else {
    alert("Preencha os campos!");
  }
};

// Function to update events in the database by an event id

const updateEvent = (eventId) => {

  // Checks if the user wants to update the event

  if (confirm("Deseja mesmo atualizar os dados?")) {

    // Get the values from the form

    let title = document.getElementById(`eventName${eventId}`);
    let description = document.getElementById(`eventDescription${eventId}`);
    let date = document.getElementById(`eventDate${eventId}`);

    // Image update in the database

    let updatedImage;

    document.getElementById("image"+eventId).addEventListener("change", function () {
      const reader = new FileReader();

      const displayImage = document.querySelector(`#display-image${eventId}`);

      reader.addEventListener("load", () => {
        updatedEvent = reader.result;
        displayImage.style.backgroundImage = `url(${updatedImage})`;
        displayImage.style.resize = "cover";
      });
      reader.readAsDataURL(this.files[0]);
    });

    // Creates a new eupdatedEvent object

    let updatedEvent = {
      title: title.value,
      description: description.value,
      imageUrl: updatedImage,
      date: date.value
    };

    // And then tries to update the event in the database

    axios
      .put(url + `/api/event/${eventId}`, updatedEvent)
      .then((response) => {

        // If the event is updated successfully, it gets the events from the database to render them in the page

        getEvents();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

// Function to toggle the inputs to enable the user to edit the event

const toggleInputs = (number) => {
  let ids = [
    "eventName",
    "eventDescription",
    "eventDate",
    "eventImage",
    "updateButton",
  ];
  let buttonText = document.getElementById(`btnText${number}`);

  let inputs = ids.map((id) => document.getElementById(id + number));
  inputs.map((input) => {
    input.disabled = !input.disabled;
    buttonText.innerText = input.disabled
      ? "Habilitar edição"
      : "Desabilitar edição";
  });
};

// Function to delete an event by an event id

const deleteEvent = (id) => {
  if (confirm("Deseja mesmo deletar este evento?")) {
    axios
      .delete(url + "/api/event/" + id)
      .then((res) => {
        getEvents();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

// Filter events by name

function eventFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("eventFilterInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    //search in the first column, if the text is found, search in the second column
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}