window.showModal =
function(
title,
message
){


document.getElementById(
"modal-title"
).innerHTML =
title;


document.getElementById(
"modal-message"
).innerHTML =
message;


document.getElementById(
"modal"
).style.display =
"block";


}




window.closeModal =
function(){


document.getElementById(
"modal"
).style.display =
"none";


}
