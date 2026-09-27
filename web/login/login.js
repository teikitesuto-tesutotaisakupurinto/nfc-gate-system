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




// Redmiのカード読み取り監視

const q =
query(

collection(db,"card_scans"),

orderBy("time","desc")

);



onSnapshot(q,(snapshot)=>{


snapshot.docChanges()
.forEach(

async(change)=>{


if(change.type==="added"){


const data =
change.doc.data();


checkStaff(
data.cardIdm
);


}


});


});





async function checkStaff(cardIdm){



const staffQuery =
query(

collection(
db,
"staff_cards"
),

where(
"cardIdm",
"==",
cardIdm
)

);



const result =
await getDocs(
staffQuery
);



if(result.empty){


status.innerHTML=

`
⚠
スタッフカードではありません

`;

return;

}



const staff =
result.docs[0].data();



if(
staff.status !== "active"
){


status.innerHTML=
"利用停止カード";


return;

}





status.innerHTML=

`

認証成功

${staff.name} さん


管理画面へ移動

`;



setTimeout(()=>{


location.href =
"../office-terminal/index.html";


},1500);



}
