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
      console.log(element);
      if(progress <= 1){
          window.requestAnimationFrame(callback);
      }
  }
  window.requestAnimationFrame(callback);
}

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
