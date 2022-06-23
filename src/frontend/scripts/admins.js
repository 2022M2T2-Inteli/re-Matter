const PORT = 1234;
const TOKEN = "0987654321"
const url = `http://localhost:${1234}`;

document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", (e) => e.preventDefault());
//table get admins
const getAdmins = () => {
  axios
    .get(url + `/api/${TOKEN}/admin`)
    .then((response) => {
      const admins = [];
      response.data.forEach((admin) => {
        admins.push(admin);
      });

      document.getElementById("resultado").innerHTML = "";

      renderAdmins(admins);

      return response.data;
    })
    .catch((e) => console.error(e));
};
getAdmins();

const renderAdmins = (list) => {
  const table = document.getElementById("resultado");

  list.length > 0
    ? list.map((admin) => {
        const { adminId, name, username, email, phoneNumber, password } =
          admin;

        const passwordToggle = () => {
          // substitui o valor do campo de senha por ******
          let passwordInput = document.getElementById("adminPassword");
          passwordInput.value == "********" ? passwordInput.value = password : passwordInput.value = "********";
        }
      
        document.getElementById("togglePasswordsButton").addEventListener("click", passwordToggle);

        table.innerHTML += `
        <tr data-bs-toggle="modal" data-bs-target="#exampleModal${adminId}" id="tableRow">
          <td class="fs-6">${name}</td>
          <td class="fs-6">${username}</td>
          <td class="fs-6">${password}</td>
          <td class="fs-6 d-none d-md-table-cell">${email}</td>
          <td class="fs-6">${phoneNumber}</td>
        </tr>
        
        ${adminModal(admin)}
        `;
      })
    : (table.innerHTML = `
  <tr>
    <td class='fs-6 align-middle'>Nenhum aministrador encontrado</td>
    <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td class="d-xs-none d-md-block"><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td class="d-none d-md-table-cell"><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    <td class="d-none d-md-table-cell"><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
  </tr>
  `);
};
//ADMIN MODAL edit
const adminModal = (admin) => {
  const { adminId, name, login, email, phoneNumber, password, type } =
  admin;

  return `
    <div class="modal fade" id="exampleModal${adminId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-3" id="exampleModalLabel">
              #${adminId}
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
              
                <!-- Name sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Nome</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="adminName${adminId}" disabled=true value="${name}"..."></input>
                    </div>
                  </div>
                </div>

                <!-- Login sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Login</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="adminDonation${adminId}" disabled=true value="${login}"></input>
                    </div>
                  </div>
                </div>

                <!-- Email sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Email</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="adminDate${adminId}" disabled=true value="${email}"></input>
                    </div>
                  </div>
                </div>

                <!-- Phonenumber sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Telefone</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="adminContact${adminId}" disabled=true value="${phoneNumber}"></input>
                    </div>
                  </div>
                </div>

                <!-- Password sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Senha</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input class="form-control border" id="adminPassword${adminId}" value="${password}" disabled=true></input>
                    </div>
                  </div>
                </div>

              </div>
              <div class='col-12 mt-2 d-flex justify-content-center align-items-center'>
                  <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${adminId});">
                    <span id="btnText${adminId}" class="fs-6">Habilitar edição </span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </button>
                </div>
            </div>
          </div>    
          

          <div class="modal-footer">
            <button type="button" class="btn btn-warning mx-auto" onclick="updateAdmin(${adminId});" id="updateButton${adminId}" data-bs-dismiss="modal" disabled='true'>Atualizar</button>

            <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between"
              data-bs-dismiss="modal"
            onclick="deleteAdmin(${adminId})">
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

const insertAdmin = () => {
  let name = document.getElementById("adminName");
  let username = document.getElementById("username");
  let email = document.getElementById("adminEmail");
  let phoneNumber = document.getElementById("adminPhone");
  let password = document.getElementById("adminPassword");

  let admin = {
    name: name.value,
    username: username.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    password: password.value,
  };

  if (admin.username !== "" || admin.password !== null) {
    axios
      .post(url + `/api/${TOKEN}/admin`, admin)
      .then((res) => {
        getAdmins();
        alert("Administrador adicionado com sucesso!");

        name.value = "";
        username.value = "";
        email.value = "";
        phoneNumber.value = "";
        password.value = "";
      })
      .catch((e) => console.error(e));
  } else {
    alert("Preencha o campo de doação!");
  }
};

const updateAdmin = (adminId) => {
  if (confirm("Deseja mesmo atualizar os dados?")) {
    let name = document.getElementById("adminName" + adminId);
    let type = document.getElementById("adminType" + adminId);
    let donation = document.getElementById(
      "adminDonation" + adminId
    );
    let date = document.getElementById("adminDate" + adminId);
    let contact = document.getElementById(
      "adminContact" + adminId
    );
    let status = document.getElementById("adminStatus" + adminId);

    let updatedAdmin = {
      name: name.value,
      type: type.value,
      donation: donation.value,
      date: date.value,
      contact: contact.value,
      status: status.value,
      adminId: adminId,
    };

    axios
      .put(url + `/api/admin/${adminId}`, updatedAdmin)
      .then((response) => {
        getAdmins();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const toggleInputs = (number) => {
  let ids = [
    "adminName",
    "adminDonation",
    "adminDate",
    "adminContact",
    "adminPassword",
    "updateButton"
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

const deleteAdmin = (id) => {
  axios
    .delete(url + "/api/admin/" + id)
    .then((res) => {
      getAdmins();
    })
    .catch((e) => console.error(e));
};

function adminFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("adminFilterInput");
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

function adminFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("dateFilterInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    //search in the first column, if the text is found, search in the second column
    nameTd = tr[i].getElementsByTagName("td")[0];
    userTd = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = nameTd.textContent || nameTd.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      txtValue = userTd.textContent || userTd.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
