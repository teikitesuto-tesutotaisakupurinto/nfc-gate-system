import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
doc,
setDoc,
getDoc,
updateDoc,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";





// カード読み取り

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



loadCard();


}


}

);


});







async function loadCard(){


const ref =
doc(
db,
"cards",
cardIdm
);



const snap =
await getDoc(ref);



if(!snap.exists()){


document.getElementById(
"status"
).innerHTML=

"未登録カード";


return;

}



const data =
snap.data();



document.getElementById(
"name"
).value =
data.name;



document.getElementById(
"status"
).innerHTML=

`

状態：

${data.status}

`;



}







// 新規登録

document.getElementById(
"register"
).onclick =
async()=>{


await setDoc(

doc(
db,
"cards",
cardIdm
),

{

name:
document.getElementById(
"name"
).value,


status:
"active",


contracts:[],


createdAt:
serverTimestamp()


}

);



alert(
"登録完了"
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
"cards",
cardIdm
),

{

status:
"suspended"

}

);



alert(
"停止しました"
);


};







// 再有効化

document.getElementById(
"restart"
).onclick =
async()=>{


await updateDoc(

doc(
db,
"cards",
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
