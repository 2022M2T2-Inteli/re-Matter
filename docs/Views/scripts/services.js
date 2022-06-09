const url = "http://127.0.0.1:5555";

const getServices = () => {
  axios
    .get(url + "/api/service")
    .then((response) => {
      console.log(response.data);
      const services = [];
      response.data.forEach((service) => {
        console.log(service);
        services.push(service);
        document.getElementById("resultado").innerHTML = ""
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
          ${service.observation}
          </td>
          <td>
          ${service.assistedID}
          </td>
          <td>
          ${service.towelId}
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
}
getServices();

const insertService = () =>{
  var name = document.getElementById("assistido").value;  
  var service = document.getElementById("service").value;
  var obs = document.getElementById("obs").value;
  var towel = document.getElementById("towelId").value;
  axios
    .post(url + "/api/service", {
      assistedID: name,
      type: service,
      observation: obs,
      towelId: towel
    }).then(res => {
      res.send(200)
      getServices()
  })
  .catch(err => console.error(err))

}
};
getServices();

