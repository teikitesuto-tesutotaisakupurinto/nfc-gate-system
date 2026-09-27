import {db}
from "../firebase.js";


import {

doc,
getDoc,
addDoc,
collection,
serverTimestamp

}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



window.readCard =
async function(cardId){



const ref =
doc(
db,
"cards",
cardId
);



const snap =
await getDoc(ref);



if(!snap.exists()){


error(
"登録されていないカードです"
);


return;

}



const data =
snap.data();



let html =
`

<h2>
${data.name} 様
</h2>

<h3>
利用可能サービス
</h3>

`;



data.contracts.forEach(
(c)=>{


html +=

`

<button onclick="
useService('${cardId}',
'${c.serviceId}')
">

${c.serviceName}

</button>

<br>

`;



});



document.getElementById(
"result"
).innerHTML=html;



}



window.useService =
async function(
cardId,
serviceId
){



await addDoc(

collection(
db,
"usage_logs"
),

{

cardId,

serviceId,

time:
serverTimestamp()

}

);



document.getElementById(
"result"
).innerHTML=

`

<h1>
ご利用ありがとうございます
</h1>

`;



}



function error(msg){

document.getElementById(
"result"
).innerHTML=

`

<h2>
⚠ ${msg}
</h2>

`;

}
