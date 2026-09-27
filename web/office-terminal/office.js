import {db}
from "../../firebase/firebase.js";


import {

collection,
addDoc,
serverTimestamp

}

from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



document
.getElementById("service")
.onclick =
async()=>{


await addDoc(

collection(
db,
"services"
),

{

name:
"肩叩き10分コース",

type:
"subscription",

createdAt:
serverTimestamp()

}

);


alert(
"サービス登録完了"
);


};
