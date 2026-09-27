import {db}
from "../../firebase/firebase.js";


import {

collection,
query,
orderBy,
limit,
getDocs

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





async function loadHistory(){



// 利用履歴

const usageSnap =
await getDocs(

query(

collection(
db,
"usage_logs"
),

orderBy(
"time",
"desc"
),

limit(50)

)

);



let usage="";



usageSnap.forEach(
(doc)=>{


const d =
doc.data();



usage +=

`

<p>

${d.serviceName}

<br>

カード:
${d.cardIdm}

<br>

${d.time?.toDate()}

</p>

<hr>

`;



});



document.getElementById(
"usage"
).innerHTML =
usage;







// 更新履歴

const renewSnap =
await getDocs(

query(

collection(
db,
"renewal_logs"
),

orderBy(
"time",
"desc"
),

limit(50)

)

);



let renew="";



renewSnap.forEach(
(doc)=>{


const d =
doc.data();



renew +=

`

<p>

${d.serviceName}

<br>

${d.beforeDate}

↓

${d.afterDate}

<br>

${d.time?.toDate()}

</p>

<hr>

`;



});



document.getElementById(
"renew"
).innerHTML =
renew;








// 操作履歴

const opSnap =
await getDocs(

query(

collection(
db,
"operation_logs"
),

orderBy(
"time",
"desc"
),

limit(50)

)

);



let operation="";



opSnap.forEach(
(doc)=>{


const d =
doc.data();



operation +=

`

<p>

${d.action}

<br>

${d.detail}

<br>

${d.time?.toDate()}

</p>

<hr>

`;



});



document.getElementById(
"operation"
).innerHTML =
operation;


}



loadHistory();
