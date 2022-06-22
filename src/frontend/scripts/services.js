const PORT = 1234;
const url = `http://localhost:${1234}`;

document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", (e) => e.preventDefault());

// Function that gets all the services provided that are in the database 

const getServices = () => {
  axios
    .get(`${url}/api/service`)
    .then((response) => {

      // If it succeeds, it will render the services

      const services = [];
      response.data.forEach((service) => {
        services.push(service);
      });

      // Calls the function to render services from the data gotten from the database

      document.getElementById("resultado").innerHTML = "";

      renderServices(services);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getServices();

// Function that render all the services goten from the database

const renderServices = (list) => {
  const table = document.getElementById("resultado");

  list.length > 0
    ? list.map((service) => {
        const { assistedID } = service;

        getAssistedName(assistedID, `assistedName${service.serviceId}`);

        table.innerHTML += ` 

          ${serviceModal(service)}

          <tr data-bs-toggle="modal" data-bs-target="#exampleModal${
            service.serviceId
          }" id="tableRow">
            <td class='fs-6'>
            ${
              service.type == "atv"
                ? "Atividade"
                : service.type == "bath"
                ? "Banho"
                : service.type == "clothes"
                ? "Roupa"
                : service.type == "ubs"
                ? "UBS"
                : service.type == "cras"
                ? "CRAS"
                : service.type == "poupa_tempo"
                ? "Poupa tempo"
                : service.type == "transport"
                ? "Transporte"
                : "Outro"
            }
          </td>
          <td class='fs-6'>
          ${service.time}
          </td>
          <td class='fs-6 d-none d-md-table-cell'>
          ${service.observation.length > 0 ? service.observation : "-"}</
          </td>
          <td class='fs-6' id='assistedName${service.serviceId}'>
          ${service.assistedID}
          </td>
          <td class='fs-6'>
          ${service.towelId}
          </td>
          </tr>
    `;
      })
    : (table.innerHTML = `
  <tr>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td class='fs-6 align-middle'>Nenhum serviço encontrado</td>
    <td class="d-xs-none d-md-block"><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
  </tr>
  `);
};

const serviceModal = (service) => {
  const { serviceId, type, time, observation, towelId, assistedID } = service;

  getAssistedName(assistedID, `assistedIdInput${serviceId}`);

  return `
    <div class="modal fade" id="exampleModal${serviceId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-3" id="exampleModalLabel">
              #${serviceId} ${
    type == "atv"
      ? "Atividade"
      : service.type == "bath"
      ? "Banho"
      : service.type == "clothes"
      ? "Roupa"
      : service.type == "ubs"
      ? "UBS"
      : service.type == "cras"
      ? "CRAS"
      : service.type == "poupa_tempo"
      ? "Poupa tempo"
      : service.type == "transport"
      ? "Transporte"
      : "Outro"
  } 
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">

                <!-- Type sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Serviço</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <select name="type" id="serviceIdInput${serviceId}" class="form-select border" onchange="check()" disabled=true>
                        <option value="atv" selected="${
                          type == "atv" ? "true" : "false"
                        }" > Atividade </option>
                        <option value="bath" selected="${
                          type == "bath" ? "true" : "false"
                        }"> Banho </option>
                        <option value="clothes" selected="${
                          type == "clothes" ? "true" : "false"
                        }"> Roupa </option>
                        <option value="ubs" selected="${
                          type == "ubs" ? "true" : "false"
                        }"> UBS </option>
                        <option value="cras" selected="${
                          type == "cras" ? "true" : "false"
                        }"> CRAS </option>
                        <option value="poupa_tempo" selected="${
                          type == "poupa_tempo" ? "true" : "false"
                        }"> Poupa tempo </option>
                        <option value="transport" selected="${
                          type == "transport" ? "true" : "false"
                        }"> Transporte </option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <!-- Date sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Data</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="text" class="form-control border" id="dateInput${serviceId}" value="${time}" disabled=true placeholder="DD/MM/AAAA">
                    </div>
                  </div>
                </div> 

                <!-- Observation sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Observação</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <textarea class="form-control border" id="observationInput${serviceId}" disabled=true placeholder="Observações...">${observation}</textarea>
                    </div>
                  </div>
                </div>

                <!-- Towel sec -->
                <div class="form-group mb-2 ${type !== "bath" ? "d-none" : ""}">
                  <label for="exampleInputEmail1" class="fs-4">Toalha</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="text" class="form-control border" id="towelIdInput${serviceId}" value="${towelId}" disabled=true placeholder="Nº toalha">
                    </div>
                  </div>
                </div>

                <!-- Assisted sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Assistido</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="text" class="form-control" id="assistedIdInput${serviceId}" value="${assistedID}" disabled=true placeholder="Assistido">
                    </div>
                  </div>
                </div>

              </div>

              <div class='col-12 mt-4 d-flex justify-content-center align-items-center'>
              <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${serviceId});">
                <span id="btnText${serviceId}" class="fs-6">Habilitar edição </span>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </button>
            </div>
            </div>

          </div>          

          <div class="modal-footer">
            <button type="button" class="btn btn-warning mx-auto" onclick="updateService(${
              (serviceId, assistedID)
            });" disabled='true' id="updateButton${serviceId}">Atualizar</button>

            <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between"
              data-bs-dismiss="modal"
            onclick="deleteService(${serviceId})">
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

const insertService = () => {
  var name = document.getElementById("assistido").value;
  var serviceType = document.getElementById("service").value;
  var obs = document.getElementById("obs").value;
  var towel = document.getElementById("towelInput").value;

  let service = {
    assistedID: name || "",
    type: serviceType || "",
    observation: obs || "",
    towelId: towel !== "" ? towel : "-",
  };

  axios
    .post(`${url}/api/service`, service)
    .then((res) => {
      getServices();
      alert("Serviço adicionado com sucesso!");
    })
    .catch((e) => console.error(e));
};

const updateService = (service) => {
  if (confirm("Deseja mesmo atualizar os dados?")) {
    const { serviceId, type, towelId, observation, assistedID } = service;

    let updatedService = {
      type: type,
      observation: observation,
      towelId: towelId,
      assistedID: assistedID,
    };

    axios
      .put(
        `${url}/api/service/${serviceId}`,
        updateService
      )
      .then((response) => {
        getServices();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const toggleInputs = (number) => {
  let ids = [
    "serviceIdInput",
    "dateInput",
    "observationInput",
    "towelIdInput",
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

const deleteService = (id) => {
  axios
    .delete(`${url}/api/service/${id}`)
    .then((res) => {
      getServices();
    })
    .catch((e) => console.error(e));
};

function check() {
  let service = document.getElementById("service");
  let towelId = document.getElementById("towelInput");

  if (service.value == "bath") {
    towelId.disabled = false;
    towelId.required = true;
  } else {
    towelId.disabled = true;
    towelId.required = false;
    towelId.value = "";
  }
}

function serviceFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("serviceFilterInput");
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

function assistedFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("assistedFilterInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    //search in the first column, if the text is found, search in the second column
    td = tr[i].getElementsByTagName("td")[3];
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

function dateFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("assistedFilterInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    //search in the first column, if the text is found, search in the second column
    td = tr[i].getElementsByTagName("td")[1];
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

const getAssisteds = () => {
  axios
    .get(`${url}/api/assisted`)
    .then((response) => {
      const assisteds = [];
      response.data.forEach((assisted) => {
        assisteds.push(assisted);
      });

      renderAssisted(assisteds);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getAssisteds();

const renderAssisted = (list) => {
  list.map((assisted) => {
    document.getElementById("assistido").innerHTML += `
    <option value="${assisted.assistedId}">${
      assisted.name || assisted.nickname
    }</option>
    `;
  });
};

const getAssistedName = (assistedID, id) => {
  axios
    .get(`${url}/api/assisted/${assistedID}`)
    .then((response) => {
      const assistedName = response.data.name || response.data.nickname;
      let value = document.getElementById(id);

      value.tagName == "INPUT"
        ? (value.value = assistedName)
        : (value.innerText = assistedName);
    })
    .catch((e) => console.error(e));
};
