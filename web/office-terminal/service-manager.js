import {db}
from "../../firebase/firebase.js";


import {

collection,
addDoc,
getDocs,
serverTimestamp

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const nameInput =
document.getElementById("name");


const typeInput =
document.getElementById("type");


const countInput =
document.getElementById("count");



const list =
document.getElementById("list");




// サービス登録

document.getElementById(
"save"
).onclick =
async()=>{


const data = {


name:
nameInput.value,


type:
typeInput.value,


count:

typeInput.value==="ticket"

?
Number(countInput.value)

:
null,


active:
true,


createdAt:
serverTimestamp()


};



await addDoc(

collection(
db,
"services"
),

data

);



alert(
"サービス登録しました"
);



loadServices();


};





// 一覧表示

async function loadServices(){


list.innerHTML="";



const snap =
await getDocs(

collection(
db,
"services"
)

);



snap.forEach(
(doc)=>{


const s =
doc.data();



list.innerHTML +=

`

<div>

<b>
${s.name}
</b>

<br>

種類：
${

s.type==="subscription"

?

"定期券"

:

"回数券"

}


</div>

<hr>

`;



});


}



loadServices();
