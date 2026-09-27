import { db }
from "../../firebase/firebase.js";


import {

collection,
doc,
setDoc,
getDocs,
serverTimestamp,
updateDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const deviceId =
document.getElementById(
"deviceId"
);


const deviceName =
document.getElementById(
"deviceName"
);


const deviceType =
document.getElementById(
"deviceType"
);


const status =
document.getElementById(
"status"
);


const list =
document.getElementById(
"deviceList"
);




// 登録ボタン

document.getElementById(
"register"
).onclick =
async()=>{


if(
!deviceId.value ||
!deviceName.value
){


alert(
"入力してください"
);


return;

}



await setDoc(

doc(
db,
"devices",
deviceId.value
),

{


name:
deviceName.value,


type:
deviceType.value,


status:
status.value,


createdAt:
serverTimestamp()


}

);



alert(
"端末登録完了"
);



loadDevices();


};




// 一覧表示

async function loadDevices(){


list.innerHTML="";



const snap =
await getDocs(

collection(
db,
"devices"
)

);



snap.forEach(

(device)=>{


const data =
device.data();



list.innerHTML +=


`

<div>

<h3>
${data.name}
</h3>


端末ID：
${device.id}

<br>


種類：
${

data.type==="office"

?

"窓口端末"

:

"サービス利用端末"

}


<br>


状態：
${data.status}


<br><br>


<button
onclick="
changeStatus(
'${device.id}',
'${data.status}'
)
">

状態変更

</button>


</div>


<hr>


`;



});


}





// 状態変更

window.changeStatus =
async function(
id,
current
){



const newStatus =

current==="active"

?

"inactive"

:

"active";



await updateDoc(

doc(
db,
"devices",
id
),

{

status:
newStatus

}

);



alert(
"変更しました"
);



loadDevices();


}





loadDevices();
