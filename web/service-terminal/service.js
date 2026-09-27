import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
doc,
getDoc,
addDoc,
serverTimestamp

}

from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const result =
document.getElementById("result");



const scanQuery =
query(

collection(db,"card_scans"),

orderBy("time","desc")

);



onSnapshot(
scanQuery,

(snapshot)=>{


snapshot.docChanges()
.forEach(

(change)=>{


if(change.type==="added"){


const data =
change.doc.data();


checkCard(
data.cardIdm
);


}


}

);


}

);





async function checkCard(cardIdm){


const ref =
doc(
db,
"cards",
cardIdm
);


const snap =
await getDoc(ref);



if(!snap.exists()){


result.innerHTML=

`

<h2>
カードエラー
</h2>

<p>
登録されていません
</p>

`;


return;

}



const card =
snap.data();



let html=

`

<h2>
${card.name} 様
</h2>

<h3>
利用可能サービス
</h3>

`;



card.contracts.forEach(
(service)=>{


html+=`

<button
onclick="
useService(
'${cardIdm}',
'${service.serviceId}'
)
">

${service.serviceName}

</button>

`;



});


result.innerHTML=html;


}




window.useService=
async function(
cardIdm,
serviceId
){


await addDoc(

collection(
db,
"usage_logs"
),

{

cardIdm,

serviceId,

time:
serverTimestamp()

}

);



result.innerHTML=

`

<h1>
ご利用ありがとうございます
</h1>

`;


};
