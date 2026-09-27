import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
doc,
getDoc,
updateDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";

let selectedService=null;



// カード読み取り

onSnapshot(

query(

collection(db,"card_scans"),

orderBy(
"time",
"desc"
)

),

(snapshot)=>{


snapshot.docChanges()
.forEach(

(change)=>{


if(change.type==="added"){


cardIdm =
change.doc.data().cardIdm;



document.getElementById(
"card"
).innerHTML=

`
カード：

${cardIdm}

`;


loadServices();


}


}

);


});





// サービス一覧取得

async function loadServices(){


const box =
document.getElementById(
"services"
);


box.innerHTML="";



onSnapshot(

collection(db,"services"),

(snapshot)=>{


box.innerHTML="";



snapshot.forEach(

(doc)=>{


const s =
doc.data();



box.innerHTML +=


`

<button onclick="
selectService(
'${doc.id}',
'${s.name}',
'${s.type}'
)
">


${s.name}

(${s.type})


</button>


<br>

`;



}


);



}


);



}




window.selectService =
function(
id,
name,
type
){


selectedService={

id,

name,

type

};


alert(
name+"を選択"
);


};






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


const card =
snap.data();



card.contracts.push(

{

serviceId:
selectedService.id,


serviceName:
selectedService.name,


type:
selectedService.type,


endDate:
"2026-12-31",


remainingCount:

selectedService.type==="ticket"

?
10

:
null


}

);



await updateDoc(

ref,

{

contracts:
card.contracts

}

);



alert(
"発行完了"
);


};
