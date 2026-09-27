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


import {

playSound

}

from "./sound.js";



const result =
document.getElementById(
"result"
);




// カード読み取り監視

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

(change)=>{


if(change.type==="added"){


const cardIdm =
change.doc.data().cardIdm;


checkCard(
cardIdm
);


}


}

);


});





async function checkCard(cardIdm){



const ref =
doc(
db,
"cards",
cardIdm
);



const snap =
await getDoc(ref);



if(!snap.exists()){


error(
"カードを確認できません"
);


return;

}



const card =
snap.data();



let html =

`

<h2>
${card.name} 様
</h2>

<h3>
利用サービスを選択してください
</h3>

`;



card.contracts.forEach(
(c,index)=>{


html +=

`

<button onclick="
useService('${cardIdm}',${index})
">

${c.serviceName}

</button>

`;


});



result.innerHTML =
html;


}





window.useService =
async function(
cardIdm,
index
){



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



const contract =
card.contracts[index];



// 定期券

if(
contract.type==="subscription"
){



const today =
new Date();


const end =
new Date(
contract.endDate
);



if(today>end){


error(
"期限切れです"
);


return;

}



await saveUsage(
cardIdm,
contract
);



complete(
"ご利用ありがとうございます"
);


}






// 回数券

if(
contract.type==="ticket"
){



if(
contract.remainingCount<=0
){


error(
"利用回数がありません"
);


return;

}



contract.remainingCount--;



card.contracts[index]
=
contract;



await updateDoc(

ref,

{

contracts:
card.contracts

}

);



await saveUsage(
cardIdm,
contract
);




if(
contract.remainingCount===0
){


warning(
"今回で最後のご利用です"
);


}

else if(
contract.remainingCount<=5
){


warning(
"残り"+contract.remainingCount+"回です"
);


}

else{


complete(
"ご利用ありがとうございます"
);


}


}



}







async function saveUsage(
cardIdm,
contract
){



await addDoc(

collection(
db,
"usage_logs"
),

{

cardIdm,

service:
contract.serviceName,

time:
serverTimestamp()

}

);


}





function complete(msg){


result.innerHTML=

`

<div class="success">

${msg}

<br><br>

ありがとうございました

</div>

`;


playSound(
"success"
);


}





function warning(msg){


result.innerHTML=

`

<div>

${msg}

</div>

`;


playSound(
"warning"
);


}





function error(msg){


result.innerHTML=

`

<div class="error">

⚠ ${msg}

</div>

`;


playSound(
"error"
);


}
