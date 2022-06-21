const url = "http://localhost:5555";
const TOKEN = "0987654321";

let exportedAssisted = []

const getAssisteds = () => {
  axios
    .get(url + "/api/assisted")
    .then((response) => {
      const assisteds = [];
      response.data.forEach((assisted) => {
        assisteds.push(assisted);
      });

      exportedAssisted.push(...assisteds);

      renderAssisted(assisteds);
      //função que escreve o relatório de assistidos
      var button = false
      
      $("#but").click(function(){
        button = true
        console.log(button)
        if (button == true) {
          console.log("entrou")
          function generateRelatory() {
            let relatory = "";
            //forma um relatorio da tabela dos assistidos
            for (let info in assisteds) {
              //adiciona ao relatorio as informações do assistido
              relatory += `
              Nome: ${assisteds[info].name}
              Nome social: ${assisteds[info].nickname}
              Data de chegada: ${assisteds[info].approachDate}
              Local: ${assisteds[info].place}
              Tempo na rua: ${assisteds[info].time}
              Responsável: ${assisteds[info].responsibleId}
              \n
            `
            }
            //teste
            console.log(assisteds.find(assisted => assisted.createdAt == "6/9/2022"))
            console.log(relatory)
            //retorna o relatorio
            return relatory;
          }
          //cria um pdf
          var doc = new jsPDF({
            orientation: 'portrait',
            unit: 'cm',
            format: 'A4'
          })
          //adiciona o relatorio ao pdf
          doc.text(generateRelatory(), 1, 1)
          doc.save('relatorio.pdf')
          button = false
        }
      })
      return assisteds;
    })
    .catch((e) => console.error(e));
};
exportedAssisted.map((assisted) => {
  console.log(assisted);
})
getAssisteds();


const renderAssisted = (list) => {
  const table = document.getElementById("resultado");
  const getResponsibleName = (id, assistedId) => {
    axios
      .get(url + `/api/${TOKEN}/admin`)
      .then((response) => {
        const adminName = response.data.find((admin) => admin.adminId == id);

        document.getElementById(`responsibleName${assistedId}`).innerHTML =
          adminName.name;
      })
      .catch((e) => console.error(e));
  };

  table.innerHTML = "";

  list.length > 0
    ? list.map((assisted) => {
      const { responsibleId, assistedId } = assisted;
      getResponsibleName(responsibleId, assistedId);

      table.innerHTML += `
    
    ${modal(assisted)}

    <tr class="mt-1" data-bs-toggle="modal" data-bs-target="#exampleModal${assisted.assistedId
        }" id="tableRow">
      <td class='fs-6'>
        ${assisted.assistedId ||
        '<img src="../../Views/images/loading.svg" alt="" width="48" height="48" />'
        }
      </td>
      <td class='fs-6'>
        ${assisted.name || "Não informado..."}
      </td>
      <td class='fs-6 fw-bold'>
        ${assisted.nickname}
      </td>
      <td class='fs-6' id="responsibleName${assisted.assistedId}"></td>
    </tr>
    `;
    })
    : (document.getElementById("resultado").innerHTML = `
    <tr>
      <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
      <td class='fs-6 align-middle'>Nenhum assistido encontrado</td>
      <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
      <td><img src="../../Views/images/loading.gif" alt="" width="24" class="mx-auto my-0"/></td>
    </tr>
    `);
};

const renderLoading = () => {
  document.getElementById("resultado").innerHTML = `
    <tr>
      <td></td>
      <td class='fs-4'>Carregando... <img src="../../Views/images/loading.gif" alt="" width="32" height="32" /></td>
      <td></td>
      <td></td>
    </tr>
    `;
};

const modal = (assisted) => {
  const {
    name,
    nickname,
    place,
    time,
    approachDate,
    beingAttended,
    observation,
    reason,
    responsibleId,
    assistedId,
  } = assisted;

  return `
    <div class="modal fade" id="exampleModal${assistedId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-3" id="exampleModalLabel">
              #${assistedId} ${nickname} 
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
                      <input type="text" class="form-control" id="nameInput${assistedId}" aria-describedby="emailHelp" placeholder="Não informado..." value="${name == "" || name == null ? "" : name
    }" disabled='true'>
                    </div>
                    </div>
                </div>

                <!-- Nickname sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Apelido / nome fornecido</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="text" class="form-control" id="nicknameInput${assistedId}" aria-describedby="emailHelp" placeholder="Apelido / Nome fornecido" value=${nickname} disabled='true'>
                    </div>
                    </div>
                </div>

                <!-- Approach date sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Data de abordagem</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="date" class="form-control" id="approachDateInput${assistedId}" aria-describedby="emailHelp" placeholder="Data de abordagem" value=${approachDate} disabled='true'>
                    </div>
                    </div>
                </div>

                <!-- Place sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Local de abordagem</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="text" class="form-control" id="placeInput${assistedId}" aria-describedby="emailHelp" placeholder="Local de abordagem" value=${place} disabled='true'>
                    </div>
                  </div>
                </div>

                <!-- Time sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Tempo em situação de rua</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                      <input type="date" class="form-control" id="timeInput${assistedId}" aria-describedby="emailHelp" placeholder="Tempo em situação de rua" value=${time} disabled>
                    </div>
                  </div>
                </div>

                <!-- beingAttended sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1" class="fs-4">Está sendo atendido</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-12'>
                    <select name="beingAttended" id="beingAttended${assistedId}" class="form-select" aria-label="Default select example" disabled="true">
                      <option
                        value="1"
                        selected="${beingAttended === 1 ? "selected" : ""}"
                      >Sim</option>
                      <option 
                        selected=${beingAttended === 0 ? "selected" : ""}
                        value="0"
                      >Não</option>
                    </select>
                    </div>
                  </div>
                </div>
                
              </div>              
          </div>

          <div class='col-12 my-4 d-flex justify-content-center align-items-center'>
            <button type="button" class="col-5 btn btn-warning d-flex flex-row justify-content-around align-items-center" onclick="toggleInputs(${assistedId});">
              <span id="btnText${assistedId}" class="fs-6">Habilitar edição </span>

              <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-pencil ml-2" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
          </div>
        </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-warning mx-auto" onclick="updateUser(${assistedId});" disabled='true' id="updateButton${assistedId}">Atualizar</button>

            <button type="button" class="btn btn-danger d-flex align-items-center justify-content-between"
            data-bs-dismiss="modal"
          onclick="deleteUser(${assistedId})">
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

const updateUser = (id) => {
  if (confirm("Deseja mesmo atualizar os dados?")) {
    let name = document.getElementById("nameInput" + id).value;
    let nickname = document.getElementById("nicknameInput" + id).value;
    let approachDate = document.getElementById("approachDateInput" + id).value;
    let place = document.getElementById("placeInput" + id).value;
    let time = document.getElementById("timeInput" + id).value;
    let beingAttended = true;

    axios
      .put(url + "/api/assisted/" + id, {
        name: name,
        nickname: nickname,
        place: place,
        time: time,
        approachDate: approachDate,
        beingAttended: beingAttended,
      })
      .then((response) => {
        console.table(response);
        window.location.reload();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

const deleteUser = (id) => {
  if (confirm("Deseja mesmo deletar este usuário?")) {
    axios
      .delete(url + "/api/assisted/" + id)
      .then((res) => {
        getAssisteds();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};

function searchFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    //search in the first column, if the text is found, search in the second column
    td = tr[i].getElementsByTagName("td")[2];
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

const toggleInputs = (number) => {
  let ids = [
    "nameInput",
    "nicknameInput",
    "approachDateInput",
    "placeInput",
    "timeInput",
    "beingAttended",
    "updateButton",
  ];
  let buttonText = document.getElementById("btnText" + number);

  let inputs = ids.map((id) => document.getElementById(id + number));
  inputs.map((input) => {
    input.disabled = !input.disabled;
    buttonText.innerText = input.disabled
      ? "Habilitar edição"
      : "Desabilitar edição";
  });
};

