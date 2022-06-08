const url = "http://127.0.0.1:5555";

const getServices = () => {
    axios
        .get(url + "/api/collaborator")
        .then((response) => {

            console.log(response.data)
            const donations = [];
            response.data.forEach((donation) => {
                console.log(donation);
                donations.push(donation);
            });

            for (let i = 0; i < donations.length; i++) {
                let donation = donations[i];
                document.getElementById("resultado").innerHTML += `
        <tr>
          <td>
          ${donation.collaboratorId}
          </td>
          <td>
          ${donation.name}
          </td>
          <td>
          ${donation.type}
          </td>
          <td>
            ${donation.date}
          </td>
          <td>
            ${donation.donation}
          </td>
          <td>
          ${donation.contact}
            </td>
            <td>
            ${donation.status}
        </td>
        </tr>
        `;
            }

            return response.data;
        })
        .catch((e) => console.error(e));
}
getServices();