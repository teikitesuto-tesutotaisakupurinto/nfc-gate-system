export function playSound(type){


let file="";


switch(type){


case "success":

file="success.mp3";

break;


case "warning":

file="warning.mp3";

break;


case "error":

file="error.mp3";

break;


}



const audio =
new Audio(
"sounds/"+file
);


audio.play();


}
