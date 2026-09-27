import {db}
from "../firebase.js";


import {

collection,
addDoc,
serverTimestamp

}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



async function registerService(){


await addDoc(

collection(
db,
"services"
),

{

name:
"肩叩き10分",

type:
"subscription",

createdAt:
serverTimestamp()

}

);


alert(
"サービス登録しました"
);


}


window.registerService =
registerService;
