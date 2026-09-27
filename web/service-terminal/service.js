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



const scanQuery =
query(

collection(
db,
"card_scans"
),

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


const data =
change.doc.data();


checkCard(
data.cardIdm
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
"未登録カード"
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
利用可能サービス
</h3>

`;



card.contracts.forEach(
(c,index)=>{


html +=

`

<button onclick="
useService(
'${cardIdm}',
'${c.serviceId}',
${index}
)
">

${c.serviceName}

</button>

<br>

`;



});



result.innerHTML =
html;


}





window.useService =
async function(
cardIdm,
serviceId,
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



if(today > end){


error(
"期限切れです"
);


return;

}



await saveUsage(
cardIdm,
serviceId
);



success(
"ご利用ありがとうございます"
);


}



// 回数券

if(
contract.type==="ticket"
){



if(
contract.remainingCount <=0
){


error(
"残り回数がありません"
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
serviceId
);



if(
contract.remainingCount===0
){


warning(
"今回で最後の利用です"
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


success(
"ご利用ありがとうございます"
);


}



}



}







async function saveUsage(
cardIdm,
serviceId
){



await addDoc(

collection(
db,
"usage_logs"
),

{

cardIdm,

serviceId,

time:
serverTimestamp()

}

);


}






function success(msg){


result.innerHTML=

`

<h1>
${msg}
</h1>

`;

playSound(
"normal"
);

}




function warning(msg){


result.innerHTML=

`

<h1>
${msg}
</h1>

`;

playSound(
"warning"
);

}




function error(msg){


result.innerHTML=

`

<h1>
⚠ ${msg}
</h1>

`;

playSound(
"error"
);

}
