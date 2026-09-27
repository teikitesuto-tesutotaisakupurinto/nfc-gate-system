import {db}
from "../../firebase/firebase.js";


import {

doc,
getDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const deviceId =
"service001";



async function checkDevice(){



const ref =
doc(
db,
"devices",
deviceId
);



const snap =
await getDoc(ref);



if(!snap.exists()){


alert(
"未登録端末"
);


return;

}



const device =
snap.data();



if(
device.status !== "active"
){


alert(
"停止端末です"
);


return;

}



console.log(
"端末認証OK",
device.type
);


}



checkDevice();
