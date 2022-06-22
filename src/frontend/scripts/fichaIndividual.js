const PORT = 1234;
const url = `http://localhost:${1234}`;

param = window.location.href.split("/")[5];

let assistedName = document.getElementById("assistedName");

const getAssisted = () => {
  axios
    .get(`${url}/${param}`)
    .then((response) => {
      let assisted = response.data;
      renderAssisted(assisted);

      return response.data;
    })
    .catch((e) => console.error(e));
};

getAssisted();

const renderAssisted = (assisted) => {
  assisted.name == null
    ? (assistedName.attributes.placeholder.value =
        "Não forneceu" && assistedName.value)
    : (assistedName.value = assisted.name);
};

const toggleInput = () => {};

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
