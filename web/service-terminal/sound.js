export function playSound(type){

let audio;


if(type==="normal"){

audio =
new Audio(
"normal.mp3"
);

}


if(type==="warning"){

audio =
new Audio(
"warning.mp3"
);

}


if(type==="error"){

audio =
new Audio(
"error.mp3"
);

}


if(audio){

audio.play();

}

}
