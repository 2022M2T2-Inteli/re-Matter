const PORT = 1234;
const url = `http://localhost:${1234}`;

document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", (e) => e.preventDefault());

// FUnction that gets all colabortors in the database

const getCollaborators = () => {
  axios
    .get(`${url}/api/collaborator`)
    .then((response) => {
      
      // If it succeeds, it will push all the collaborators into an array
      
      const collaborators = [];
      response.data.forEach((collaborator) => {
        collaborators.push(collaborator);
      });

      document.getElementById("resultado").innerHTML = "";

      // Then it will render the collaborators

      renderCollaborators(collaborators);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getCollaborators();

// Function that render collaborator goten in the database

const renderCollaborators = (list) => {
  const table = document.getElementById("resultado");

  // Verifies if the list is empty
  // If it is, it will render a row with a message "Nenhuma colaborador encontrado"
  // If it isn't, it will render a row with the collaborator's data

  list.length > 0
    ? list.map((collaborator) => {
        const { collaboratorId, name, type, donation, date, contact, status } =
          collaborator;

        table.innerHTML += `
        <tr data-bs-toggle="modal" data-bs-target="#exampleModal${collaboratorId}" id="tableRow">
        <td class="fs-6">${name}</td>
        <td class="fs-6">${type.charAt(0).toUpperCase() + type.slice(1)}</td>
        <td class="fs-6">${donation}</td>
        <td class="fs-6">${date}</td>
        <td class="fs-6 d-none d-md-table-cell">${contact}</td>
        <td class="fs-6 d-none d-md-table-cell">${
          status.charAt(0).toUpperCase() + status.slice(1)
        }</td>
        </tr>
        
        ${collaboratorModal(collaborator)}
        `;
      })
    : (table.innerHTML = `
  <tr>
    <td class='fs-6 align-middle'>Nenhum colaborador encontrado</td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td class="d-xs-none d-md-block"><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
  </tr>
  `);
};

// Function that creates individual modals for each collaboration
// With both upadate and delete buttons, with the id as a parameter

const collaboratorModal = (collaborator) => {
  const { collaboratorId, name, type, date, contact, donation } = collaborator;

  return `
    <div class="modal fade" id="exampleModal${collaboratorId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-3" id="exampleModalLabel">
              #${collaboratorId} ${type} 
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
              
                <!-- Name sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Nome/Apelido</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="collaboratorName${collaboratorId}" disabled=true value="${name}"..."></input>
                    </div>
                  </div>
                </div>

                <!-- Type sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Tipo</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <select class="form-select border" id="collaboratorType${collaboratorId}" disabled=true value="${type}">
                      <option value="financeiro"> Financeiro </option>
                      <option value="insumo"> Insumo </option>
                      <option value="voluntario"> Voluntariado </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Donation sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Doação</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="collaboratorDonation${collaboratorId}" disabled=true value="${donation}"></input>
                    </div>
                  </div>
                </div>

                <!-- Date sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Data</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="collaboratorDate${collaboratorId}" disabled=true value="${date}"></input>
                    </div>
                  </div>
                </div>

                <!-- Contact sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Contato</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="collaboratorContact${collaboratorId}" disabled=true value="${contact}"></input>
                    </div>
                  </div>
                </div>

                <!-- Status sec -->          
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Tipo</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <select class="form-select border" id="collaboratorStatus${collaboratorId}" disabled=true value="${type}">
                        <option value="ativo"> Ativo </option>
                        <option value="pontual"> Pontual </option>
                        <option value="pendente"> Pendente </option>
                        <option value="inativo"> Inativo </option>
                      </select>
                    </div>
                  </div>
                </div>     

              </div>
              <div class='col-12 mt-2 d-flex justify-content-center align-items-center'>
                  <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${collaboratorId});">
                    <span id="btnText${collaboratorId}" class="fs-6">Habilitar edição </span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </button>
                </div>
            </div>
          </div>    
          

          <div class="modal-footer">
            <button type="button" class="btn btn-warning mx-auto" onclick="updateCollaborator(${collaboratorId});" id="updateButton${collaboratorId}" data-bs-dismiss="modal" disabled='true'>Atualizar</button>

            <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between"
              data-bs-dismiss="modal"
            onclick="deleteCollaborator(${collaboratorId})">
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

// Function that inserts a new collaborator in the database

const insertCollaborator = () => {

  // Gets all the data from the HTML file

  var name = document.getElementById("collaboratorName");
  var type = document.getElementById("collaboratorType");
  var donation = document.getElementById("collaboratorDonation");
  var date = document.getElementById("collaboratorDate");
  var contact = document.getElementById("collaboratorContact");
  var status = document.getElementById("collaboratorStatus");

  // Creates a new collaborator object

  let collaborator = {
    name: name.value || "Anônimo",
    type: type.value,
    donation: donation.value,
    date: date.value || new Date(Date.now()).toLocaleDateString(),
    contact: contact.value || "Sem contato",
    status: status.value,
  };

  // Verifies if the donation value is not null
  // If it isn't null, it tries to insert the collaborator in the database

  if (donation.value !== "" || donation.value !== null) {
    axios
      .post(
        `${url}/api/collaborator`,
        collaborator
      )
      .then((res) => {
        getCollaborators();
        alert("Colaboração adicionada com sucesso!");

        name.value = "";
        type.value = "";
        donation.value = "";
        date.value = "";
        contact.value = "";
        status.value = "";
      })
      .catch((e) => console.error(e));
  } else {
    alert("Preencha o campo de doação!");
  }
};

// Function to update a collaborator's information in the database

const updateCollaborator = (collaboratorId) => {
  
  // Verifies if the user wants to update the collaborator's information
  
  if (confirm("Deseja mesmo atualizar os dados?")) {

    // If the user confirms, it gets all the data from the HTML file with the collaborator's ID
    // and creates a new updateCollaborator object

    let name = document.getElementById("collaboratorName" + collaboratorId);
    let type = document.getElementById("collaboratorType" + collaboratorId);
    let donation = document.getElementById(
      "collaboratorDonation" + collaboratorId
    );
    let date = document.getElementById("collaboratorDate" + collaboratorId);
    let contact = document.getElementById(
      "collaboratorContact" + collaboratorId
    );
    let status = document.getElementById("collaboratorStatus" + collaboratorId);

    let updatedCollaborator = {
      name: name.value,
      type: type.value,
      donation: donation.value,
      date: date.value,
      contact: contact.value,
      status: status.value,
      collaboratorId: collaboratorId,
    };

    // Tries to update the collaborator in the database

    axios
      .put(
        `${url}/api/collaborator/${collaboratorId}`,
        updatedCollaborator
      )
      .then((response) => {

        // If the collaborator was updated, it gets all the collaborators from the database

        getCollaborators();

      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

// Function to toggle the inputs to enable the user to edit the collaborator's information

const toggleInputs = (number) => {

  // Gets all collaborator's data and adds its id to the function's parameter

  let ids = [
    "collaboratorName",
    "collaboratorType",
    "collaboratorDonation",
    "collaboratorDate",
    "collaboratorContact",
    "collaboratorStatus",
    "updateButton",
  ];
  let buttonText = document.getElementById(`btnText${number}`);


  // Then it toggles the input's status and the button's text

  let inputs = ids.map((id) => document.getElementById(id + number));
  inputs.map((input) => {
    input.disabled = !input.disabled;
    buttonText.innerText = input.disabled
      ? "Habilitar edição"
      : "Desabilitar edição";
  });
};

// Function to delete a collaborator from the database
// Gets a collaborator's id and tries to delete it from the database

const deleteCollaborator = (id) => {
  axios
    .delete(`${url}/api/collaborator/${id}`)
    .then((res) => {
      getCollaborators();
    })
    .catch((e) => console.error(e));
};


// Function to search for a collaborator in the table of collaborators

function collaboratorFilter() {
  var input, filter, table, tr, td, i, txtValue;

  // Gets all the data from the HTML file

  input = document.getElementById("collaboratorFilterInput");
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

//  Function to search a date in the table

function dateFilter() {
  var input, filter, table, tr, td, i, txtValue;

  // Gets all the data from the HTML file

  input = document.getElementById("dateFilterInput");
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
