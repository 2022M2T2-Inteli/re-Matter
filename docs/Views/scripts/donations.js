  
const url = "http://127.0.0.1:5555";

document.getElementsByTagName("form")[0].addEventListener("submit", e => e.preventDefault())

const getCollaborators = () => {
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
          <td>
            <button onclick="deleteCollaborator(${donation.collaboratorId})">
              Delete
            </button>
          </td>
        </tr>
        `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
}
getCollaborators();

const insertDonation = () => {
  let name = document.getElementById("donator");
  let type = document.getElementById("type");
  let date = document.getElementById("donationDate");
  let donation = document.getElementById("donation");
  let contact = document.getElementById("contact");
  let status = document.getElementById("status");

  axios.post(url + "/api/collaborator", {
    name: name.value,
    type: type.value,
    date: date.value,
    donation: donation.value,
    status: status.value,
    contact: contact.value
  }).then((i) => {
    console.log(i)
    window.location.reload()
  }).catch(e => {
    console.error(e)
  })
}

const deleteCollaborator = (id) => {
  if (confirm("Deseja mesmo deletar este colaborador?")) {
    axios
      .delete(url + "/api/collaborator/" + id)
      .then((response) => {
        console.table(response);
        window.location.reload();
      })
      .catch((e) => console.error(e));
  } else {
    return;
  }
};