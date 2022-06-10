const url = "http://127.0.0.1:5555";
let helpedPeople = false;
let volunteer = false;

function movePageTo(id) {
  document.getElementById("navbarSupportedContent").classList.remove("show");
  setTimeout(function () {
    document
      .getElementById(id)
      .scrollIntoView({ block: "start", behavior: "smooth" });
  }, 1);
}

function displayCounter(id, capNumber){
  const element = document.getElementById(id);
  const duration = 2000;
  let startTime = null;
  let currentNumber = 0;
  const callback = (timestamp) => {
      if(!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.innerHTML = Math.floor(progress*(capNumber - currentNumber) + currentNumber) + " Pessoas";
      if(progress <= 1){
          window.requestAnimationFrame(callback);
      }
  }
  window.requestAnimationFrame(callback);
}

document.addEventListener('DOMContentLoaded', function() {
  const inputs = Array.from(
    document.querySelectorAll('input[name=contact]')
  );

  const inputListener = e => {
    inputs
      .filter(i => i !== e.target)
      .forEach(i => (i.required = !e.target.value.length));
  };

  inputs.forEach(i => i.addEventListener('input', inputListener));
});

window.addEventListener('scroll', function() {
  var element = document.querySelector('#helped-people');
	var position = element.getBoundingClientRect();

	if(position.top < window.innerHeight && position.bottom >= 0 && !volunteer) {
		console.log('Element is partially visible in screen');
        displayCounter("helped-people", 4206969);
        volunteer = true;
	}
});

window.addEventListener('scroll', function() {
  var element = document.querySelector('#helped-people');
	var position = element.getBoundingClientRect();

	if(position.top < window.innerHeight && position.bottom >= 0 && !helpedPeople) {
		console.log('Element is partially visible in screen');
        displayCounter("volunteer", 666);
        helpedPeople = true;
	}
});

const insertCollaborator = () => {
  var name = document.getElementById("nameInput");
  var donation = document.getElementById("donationInput");
  var contact = document.getElementById("contactInput");

  let collaborator = {
    name: name.value || "Anônimo",
    type: "Voluntário",
    donation: donation.value,
    date: new Date(Date.now()).toLocaleDateString(),
    contact: contact.value || "Sem contato",
    status: "Pendente",
  };

  if (donation.value !== "" || donation.value !== null) {
    axios
      .post(url + "/api/collaborator", collaborator)
      .then((res) => {
        alert("Seu formulário foi enviado com sucesso! Obrigado!");

        name.value = "";
        donation.value = "";
        date.value = "";
        contact.value = "";
      })
      .catch((e) => console.error(e));
  } else {
    alert("Preencha o campo de doação!");
  }
};
