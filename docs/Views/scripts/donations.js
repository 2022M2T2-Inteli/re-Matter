
const url = "http://127.0.0.1:5555";

document.getElementsByTagName("form")[0].addEventListener("submit", e => e.preventDefault())

const getCollaborators = () => {
  axios
    .get(url + "/api/collaborator")
    .then((response) => {

      console.log(response.data)
      const donations = [];
      response.data.forEach((donation) => {
        console.log(donation);
        donations.push(donation);
      });

      renderCollaborator(donations)

      for (let i = 0; i < donations.length; i++) {
        let donation = donations[i];
        document.getElementById("resultado").innerHTML += `
        <tr>
          <td>
          ${donation.collaboratorId}
          </td>
          <td>
          ${donation.name}
          </td>
          <td>
          ${donation.type}
          </td>
          <td>
            ${donation.date}
          </td>
          <td>
            ${donation.donation}
          </td>
          <td>
          ${donation.contact}
            </td>
            <td>
            ${donation.status}
        </td>
          <td>
            <button onclick="deleteCollaborator(${donation.collaboratorId})">
              Delete
            </button>
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
}
getCollaborators();

const renderCollaborator = (list) => {
  list.map((collaborator) => {
    document.getElementById("resultado").innerHTML += `
        ${modal(collaborator)}
      `
  })
}

const insertDonation = () => {
  let name = document.getElementById("donator");
  let type = document.getElementById("type");
  let date = document.getElementById("donationDate");
  let donation = document.getElementById("donation");
  let contact = document.getElementById("contact");
  let status = document.getElementById("status");

  axios.post(url + "/api/collaborator", {
    name: name.value,
    type: type.value,
    date: date.value,
    donation: donation.value,
    status: status.value,
    contact: contact.value
  }).then((i) => {
    console.log(i)
    window.location.reload()
  }).catch(e => {
    console.error(e)
  })
}

const deleteCollaborator = (id) => {
  if (confirm("Deseja mesmo deletar este colaborador?")) {
    axios
      .delete(url + "/api/collaborator/" + id)
      .then((response) => {
        console.table(response);
        window.location.reload();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const modal = (collaborator) => {
  const {
    contact,
    collaboratorId,
    name
  } = collaborator;

  return `
    <div class="modal fade" id="exampleModal${collaboratorId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-3" id="exampleModalLabel">
              #${collaboratorId} ${name} 
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col-md-12">

                <!-- Name sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Contato</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="text" class="form-control" id="contactInput${collaboratorId}" aria-describedby="emailHelp" placeholder="Não informado..." value="${contact}" disabled='true'>
                    </div>
                    </div>
                </div>           
              </div>              
          </div>

          <div class='col-12 my-4 d-flex justify-content-center align-items-center'>
          <button type="button" class="col-4 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${collaboratorId});">
            Habilitar edição 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            </svg>
          </button>
        </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-warning mx-auto" onclick="updateUser(${collaboratorId});">Atualizar</button>

            <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between" data-dismiss="modal" onclick="deleteUser(${collaboratorId})">
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