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

      for (let i = 0; i < assisteds.length; i++) {
        const assisted = assisteds[i];
        document.getElementById("resultado").innerHTML += `
        <tr>
          <td>
          ${assisted.assistedId}
          </td>
          <td>
          ${assisted.name}
          </td>
          <td>
          ${assisted.nickname}
          </td>
          <td>
            ${assisted.approachDate}
          </td>
          <td>
            ${assisted.reason}
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
};

getAssisted();

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;

  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
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
