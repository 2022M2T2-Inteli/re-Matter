const url = "http://127.0.0.1:5555";

const getAssisted = () => {
  axios
    .get(url + "/api/assisted")
    .then((response) => {
      const assisteds = [];
      response.data.forEach((assisted) => {
        console.log(assisted);
        assisteds.push(assisted);
      });

      renderAssisted(assisteds);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getAssisted();

const renderAssisted = (list) => {
  console.log(list);
  list.map((assisted) => {
    document.getElementById("resultado").innerHTML += `
    
    ${modal(assisted)}
1
    <tr>
      <td class='fs-5'>
        ${assisted.assistedId}
      </td>
      <td class='fs-5'>
        ${assisted.name}
      </td>
      <td class='fs-5'>
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal${
          assisted.assistedId
        }">
          ${assisted.nickname}
        </button>
      </td>
      <td class='fs-5'>
        ${assisted.approachDate}
      </td>
      <td class='fs-5'>
        ${assisted.reason}
      </td>
    </tr>
    `;
  });
};

const modal = (assisted) => {
  return `
    <div class="modal fade" id="exampleModal${
      assisted.assistedId
    }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              ${assisted.name || assisted.nickname}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col-md-12">

                <!-- Name sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1">Nome</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-10'>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nome" value=${
                        assisted.name || "Não fornecido"
                      } disabled='true'>
                    </div>
                    <div class='col-2 d-flex justify-content-center align-items-center'>
                      <button type="button" class="btn btn-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                      </button>
                    </div>
                    </div>
                </div>

                <!-- Nickname sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1">Apelido / nome fornecido</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-10'>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Apelido / Nome fornecido" value=${
                        assisted.nickname
                      } disabled='true'>
                    </div>
                    <div class='col-2 d-flex justify-content-center align-items-center'>
                      <button type="button" class="btn btn-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                      </button>
                    </div>
                    </div>
                </div>

                <!-- Approach place sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1">Data de abordagem</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-10'>
                      <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Data de abordagem" value=${
                        assisted.approachDate
                      } disabled='true'>
                    </div>
                    <div class='col-2 d-flex justify-content-center align-items-center'>
                      <button type="button" class="btn btn-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                      </button>
                    </div>
                    </div>
                </div>

                <!-- Place sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1">Local de abordagem</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-10'>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Local de abordagem" value=${
                        assisted.place
                      } disabled='true'>
                    </div>
                    <div class='col-2 d-flex justify-content-center align-items-center'>
                      <button type="button" class="btn btn-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                      </button>
                    </div>
                    </div>
                </div>

                <!-- Time sec -->
                <div class="form-group mb-2">
                  <label for="exampleInputEmail1">Tempo em situação de rua</label>
                  <div class="d-flex flex-row justify-content-between">
                    <div class='col-10'>
                      <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Tempo em situação de rua" value=${
                        assisted.time
                      } disabled='true'>
                    </div>
                    <div class='col-2 d-flex justify-content-center align-items-center'>
                      <button type="button" class="btn btn-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                      </button>
                    </div>
                    </div>
                </div>
                
              </div>              
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

function searchFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
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
