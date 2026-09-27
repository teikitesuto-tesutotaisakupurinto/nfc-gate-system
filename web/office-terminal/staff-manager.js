import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
doc,
setDoc,
updateDoc,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";





// スタッフカード読み取り

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

カードID

${cardIdm}

`;



}


}

);


});






// 登録

document.getElementById(
"register"
).onclick =
async()=>{


await setDoc(

doc(
db,
"staff_cards",
cardIdm
),

{

cardIdm,

name:

document.getElementById(
"name"
).value,


role:

document.getElementById(
"role"
).value,


status:
"active",


createdAt:
serverTimestamp()


}

);



alert(
"スタッフ登録完了"
);


};







// 停止

document.getElementById(
"stop"
).onclick =
async()=>{


await updateDoc(

doc(
db,
"staff_cards",
cardIdm
),

{

status:
"inactive"

}

);



alert(
"停止しました"
);


};







// 有効化

document.getElementById(
"active"
).onclick =
async()=>{


await updateDoc(

doc(
db,
"staff_cards",
cardIdm
),

{

status:
"active"

}

);



alert(
"有効化しました"
);


};
