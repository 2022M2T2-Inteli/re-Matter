const url = "http://127.0.0.1:5555";

const getServices = () => {
    axios
    .get(url + "/api/service")
    .then((response) => {

        console.log(response.data)
      const services = [];
      response.data.forEach((service) => {
        console.log(service);
        services.push(service);
      });

      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        document.getElementById("resultado").innerHTML += `
        <tr>
          <td>
          ${service.type}
          </td>
          <td>
          ${service.time}
          </td>
          <td>
          ${service.towelId}
          </td>
          <td>
          ${service.observation}
          </td>
          <td>
          ${service.assistedID}
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
}
getServices();

function check(){
  let value = document.getElementById("service").value;
  if(value != "bath"){
    if(document.getElementById("towelInput") != null){
      document.getElementById("towelInput").remove();
    }
  }
  let inputTowel = document.createElement("input");
  let button = document.getElementById("addac");
  console.log(button);
  inputTowel.className = "col-md-5 col-sm-12 mx-auto w-100 form-control my-2";
  inputTowel.name = "towelId";
  inputTowel.placeholder="Número da toalha";
  inputTowel.type = "number";
  inputTowel.id = "towelInput"
  if(value == "bath"){
    if(document.getElementById("towelInput") == null){
      document.getElementById("serviceInputs").insertBefore(inputTowel, button);
    }
  }
}