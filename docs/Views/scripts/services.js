const url = "http://127.0.0.1:5555";

const getServices = () => {
    axios
    .get(url + "/area-restrita/atividades")
    .then((response) => {
      const services = [];
      response.data.forEach((service) => {
        console.log(service);
        services.push(service);
      });

      for (let i = 0; i < services.length; i++) {
        const services = services[i];
        document.getElementById("resultado").innerHTML += `
        <tr>
          <td>
          ${services.type}
          </td>
          <td>
          ${services.time}
          </td>
          <td>
          ${services.observation}
          </td>
          <td>
            ${services.assisted}
          </td>
          <td>
            ${services.towelId}
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
}
getServices();