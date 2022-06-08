const url = "http://127.0.0.1:5555";

let completeName = document.getElementById("completename");
let nickname = document.getElementById("nickname");
let approachPlace = document.getElementById("place");

let attendanceYes = document.getElementById("attendanceYes");
let attendanceNo = document.getElementById("attendanceNo");

let timeSelect = document.getElementById("timeInStreet");
let reason = document.getElementById("reason");

const insertAssisted = () => {
  axios
    .post(url + "/api/assisted", {

    })
};

insertAssisted();