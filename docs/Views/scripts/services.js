const url = "http://127.0.0.1:5555";

document.getElementsByTagName("form")[0].addEventListener('submit', e => e.preventDefault())

const getServices = () => {
  axios
    .get(url + "/api/service")
    .then((response) => {
      console.log(response.data);
      const services = [];
      response.data.forEach((service) => {
        console.log(service);
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
          <button class = "btn btn-danger my-2" onclick="deleteService(${service.serviceId})"><a class="navbar-brand">
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
  var name = document.getElementById("assistido");
  var service = document.getElementById("service");
  var obs = document.getElementById("obs");
  //var towel = document.getElementById("towelId");
  
  axios
    .post(url + "/api/service", {
      assistedID: name.value,
      type: service.value,
      observation: obs.value,
      //towelId: towel.value
    }).then(res => {
      console.log(res)
      getServices()
    })
    .catch(err => console.error(err))

}


const deleteService = (id) => {
  axios
    .delete(url + "/api/service/" + id)
    .then((response) => {
      console.table(response);
      //window.location.reload();
      getServices();
    })
    .catch((e) => console.error(e));
}






function check() {
  let value = document.getElementById("service").value;
  if (value != "bath") {
    if (document.getElementById("towelInput") != null) {
      document.getElementById("towelInput").remove();
    }
  }
  let inputTowel = document.createElement("input");
  let button = document.getElementById("addac");
  console.log(button);
  inputTowel.className = "col-md-5 col-sm-12 mx-auto w-100 form-control my-2";
  inputTowel.name = "towelId";
  inputTowel.placeholder = "Número da toalha";
  inputTowel.type = "number";
  inputTowel.id = "towelInput"
  if (value == "bath") {
    if (document.getElementById("towelInput") == null) {
      document.getElementById("serviceInputs").insertBefore(inputTowel, button);
    }
  }
}
