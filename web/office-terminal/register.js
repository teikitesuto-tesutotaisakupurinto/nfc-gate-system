import {db}
from "../../firebase/firebase.js";


import {

collection,
addDoc,
doc,
setDoc,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let cardIdm="";


// Redmi読み取り待ち

const scan =
collection(
db,
"card_scans"
);



import {

onSnapshot,
query,
orderBy

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const q =
query(
scan,
orderBy("time","desc")
);



onSnapshot(q,(snap)=>{


snap.docChanges()
.forEach(change=>{


if(change.type==="added"){


const data =
change.doc.data();


cardIdm =
data.cardIdm;


document.getElementById(
"card"
).innerHTML=

`
カード検出

${cardIdm}
`;



document.getElementById(
"form"
).style.display="block";


}


});


});





document.getElementById(
"save"
).onclick =
async()=>{


const name =
document.getElementById(
"name"
).value;



await setDoc(

doc(
db,
"cards",
cardIdm
),

{

name,

contracts:[],

createdAt:
serverTimestamp()

}

);



alert(
"登録完了"
);


};
