function movePageTo(id){
    document.getElementById("navbarSupportedContent").classList.remove("show");

    setTimeout(function(){
        document.getElementById(id).scrollIntoView({block: "start", behavior: "smooth"});
    }, 1);
}