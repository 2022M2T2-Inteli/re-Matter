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
    <tr>
      <td class='fs-5'>
      ${assisted.assistedId}
      </td>
      <td class='fs-5'>
      ${assisted.name}
      </td>
      <td class='fs-5'>
      ${assisted.nickname}
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
}

function searchFilter() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("myInput");
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
