document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", function (e) {
    e.preventDefault();
  });
//login
const logIn = () => {
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  if (
    (username.value === "usertest" && password.value === "123456") ||
    (username.value === "patricia.revirar" &&
      password.value === "patricia123") ||
    (username.value === "soraya.revirar" && password.value === "soraya123")
  ) {
    alert("Login realizado com sucesso!");
    // redirect to /adm
    window.location.href = "/area-restrita/adm";
  } else {
    alert("Usuário ou senha incorretos!");
  }
};
