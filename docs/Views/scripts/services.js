const url = "http://127.0.0.1:5555";

document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", (e) => e.preventDefault());

const getServices = () => {
  axios
    .get(url + "/api/service")
    .then((response) => {
      const services = [];
      response.data.forEach((service) => {
        services.push(service);
        document.getElementById("resultado").innerHTML = "";
      });

      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        document.getElementById("resultado").innerHTML += ` 
        <tr id="${service.serviceId}">
          <td>
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
          <td>
          ${service.time}
          </td>
          <td>
          ${service.observation}
          </td>
          <td>
          ${service.assistedID}
          </td>
          <td>
          ${service.towelId}
          </td>
          <td>
          <button class = "btn btn-danger my-2" onclick="deleteService(${
            service.serviceId
          })"><a class="navbar-brand">
          <img src="../Views/images/trash-2.svg" alt="" width="24" height="24"/>
        </a></button>
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
};
getServices();

const insertService = () => {
  var name = document.getElementById("assistido").value;
  var service = document.getElementById("service").value;
  var obs = document.getElementById("obs").value;
  var towel = document.getElementById("towelInput").value;

  axios
    .post(url + "/api/service", {
      assistedID: name,
      type: service,
      observation: obs,
      towelId: towel !== "" ? towel : "-",
    })
    .then((res) => {
      getServices();
    })
    .catch((e) => console.error(e));
};

const deleteService = (id) => {
  axios
    .delete(url + "/api/service/" + id)
    .then((res) => {
      console.log(res);
      getServices();
    })
    .catch((e) => console.error(e));
};

function check() {
  let service = document.getElementById("service");
  let towelId = document.getElementById("towelInput");

  if (service.value == "bath") {
    towelId.disabled = false;
  } else {
    towelId.disabled = true;
    towelId.value = "";
  }
}
