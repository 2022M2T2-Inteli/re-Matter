const url = "http://127.0.0.1:5555";

const getAssisted = () => {
  axios
    .get(url + "/api/assisted")
    .then((response) => {
      const assisteds = [];
      response.data.forEach((assisted) => {
        console.log(assisted);
        assisteds.push(assisted);
      });

      for (let i = 0; i < assisteds.length; i++) {
        const assisted = assisteds[i];
        document.getElementById("resultado").innerHTML += `
          <p>
            <span>${assisted.name}</span>
            <span>${assisted.place}</span>
          </p>
          <br/>
          `;
      }

      return response.data;
    })
    .catch((e) => console.error(e));
};

getAssisted();
