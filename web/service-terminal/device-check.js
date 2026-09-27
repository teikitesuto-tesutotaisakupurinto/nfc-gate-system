import {db}
from "../../firebase/firebase.js";


import {

doc,
getDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// 端末ごとに変更

const DEVICE_ID =
"service001";



async function checkDevice(){


const ref =
doc(
db,
"devices",
DEVICE_ID
);



const snap =
await getDoc(ref);



if(!snap.exists()){


showError(
"未登録端末です"
);


return;

}



const device =
snap.data();



if(
device.status !== "active"
){


showError(
"停止中の端末です"
);


return;

}



if(
device.type !== "service"
){


showError(
"サービス端末ではありません"
);


return;

}



document.getElementById(
"message"
).innerHTML =

`
カードを読み取ってください
`;



}




function showError(msg){

document.body.innerHTML=

`

<h1>
⚠ ${msg}
</h1>

`;

}



checkDevice();
