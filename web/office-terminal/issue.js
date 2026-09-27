import {db}
from "../../firebase/firebase.js";


import {

doc,
getDoc,
updateDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";



/*
ここでRedmiのcard_scans監視
*/


document.getElementById(
"issue"
).onclick =
async()=>{


const ref =
doc(
db,
"cards",
cardIdm
);



const snap =
await getDoc(ref);



let data =
snap.data();



data.contracts.push(

{

serviceId:
"service001",

serviceName:
"肩叩き10分コース",

type:
"subscription",

endDate:
"2026-12-31"

}

);



await updateDoc(
ref,
data
);



alert(
"発行しました"
);


};
