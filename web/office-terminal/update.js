import {db}
from "../../firebase/firebase.js";


import {

doc,
getDoc,
updateDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


let cardIdm="";



let cardData=null;



async function loadCard(){


const ref =
doc(
db,
"cards",
cardIdm
);



const snap =
await getDoc(ref);



cardData =
snap.data();



let html="";


cardData.contracts.forEach(
(c,index)=>{


html +=

`

<button onclick="
choose(${index})
">

${c.serviceName}

期限：
${c.endDate}

</button>

<br>

`;

});


document.getElementById(
"contracts"
).innerHTML=html;


}



window.choose =
function(index){


cardData.selected=index;


};




document.getElementById(
"update"
).onclick =
async()=>{


const index =
cardData.selected;


cardData.contracts[index].endDate =
"2027-03-31";



await updateDoc(

doc(
db,
"cards",
cardIdm
),

{

contracts:
cardData.contracts

}

);



alert(
"更新完了"
);


};
