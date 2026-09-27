import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
doc,
getDoc,
updateDoc,
addDoc,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";

let selectedService=null;




// カード取得

onSnapshot(

query(

collection(db,"card_scans"),

orderBy("time","desc")

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





// サービス一覧

function loadServices(){


onSnapshot(

collection(db,"services"),

(snapshot)=>{


const box =
document.getElementById(
"serviceList"
);


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

<br>

種類：
${s.type}


</button>


<br>


`;



});


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


if(!selectedService){

alert(
"サービスを選択してください"
);


return;

}




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


startDate:
new Date()
.toISOString(),


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





await addDoc(

collection(db,"operation_logs"),

{

action:
"issue",

cardIdm,

service:
selectedService.name,

time:
serverTimestamp()

}

);



alert(
"発行完了"
);


};
