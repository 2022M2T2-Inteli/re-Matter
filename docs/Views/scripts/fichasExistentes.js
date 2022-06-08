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
  list.map((assisted) => {
    document.getElementById("resultado").innerHTML += `
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nome</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nome" value=${
                    assisted.name || "Não fornecido"
                  }>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Apelido</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Apelido" value=${
                    assisted.nickname || "Não fornecido"
                  }>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>


    <tr>
      <td class='fs-5'>
        ${assisted.assistedId}
      </td>
      <td class='fs-5'>
        ${assisted.name}
      </td>
      <td class='fs-5'>
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

function searchFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
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
