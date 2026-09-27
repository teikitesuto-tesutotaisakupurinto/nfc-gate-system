import {db}
from "../../firebase/firebase.js";


import {

doc,
getDoc,
updateDoc,
collection,
addDoc,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";

let selected=0;



async function loadCard(){


const snap =
await getDoc(

doc(
db,
"cards",
cardIdm
)

);



const card =
snap.data();



let html="";



card.contracts.forEach(
(c,index)=>{


html +=

`

<button onclick="
selected=${index}
">

${c.serviceName}

<br>

期限：
${c.endDate}

</button>

<br>

`;

});


document.getElementById(
"contracts"
).innerHTML=html;


}





document.getElementById(
"update"
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



const card =
snap.data();



card.contracts[selected].endDate =
"2027-03-31";



await updateDoc(

ref,

{

contracts:
card.contracts

}

);



await addDoc(

collection(db,"operation_logs"),

{

action:
"update",

cardIdm,

time:
serverTimestamp()

}

);



alert(
"更新完了"
);


};
