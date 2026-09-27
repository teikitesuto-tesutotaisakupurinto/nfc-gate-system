import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
where,
getDocs,
onSnapshot,
orderBy

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const status =
document.getElementById(
"status"
);





const scanQuery =
query(

collection(db,"card_scans"),

orderBy(
"time",
"desc"
)

);





onSnapshot(

scanQuery,

(snapshot)=>{


snapshot.docChanges()
.forEach(

change=>{


if(change.type==="added"){


const cardIdm =
change.doc.data().cardIdm;


checkStaff(
cardIdm
);


}


}

);


}

);







async function checkStaff(cardIdm){



const q =
query(

collection(db,"staff_cards"),

where(
"cardIdm",
"==",
cardIdm
)

);



const snap =
await getDocs(q);



if(snap.empty){


status.innerHTML=

`
⚠

スタッフカードではありません

`;


return;

}





const staff =
snap.docs[0].data();





if(
staff.status !== "active"
){


status.innerHTML=
"停止スタッフカード";


return;

}





sessionStorage.setItem(

"staff",

JSON.stringify(
{

name:
staff.name,

role:
staff.role

}

)

);




status.innerHTML=

`

認証成功

${staff.name}

`;




setTimeout(()=>{


location.href=
"../admin/index.html";


},1000);



}
