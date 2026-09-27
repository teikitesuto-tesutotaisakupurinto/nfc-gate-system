import {db}
from "../../firebase/firebase.js";


import {

doc,
getDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const DEVICE_ID =
"office001";




async function checkDevice(){


const ref =
doc(
db,
"devices",
DEVICE_ID
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
device.status!=="active"
){


alert(
"停止端末"
);


return;

}



if(
device.type!=="office"
){


alert(
"窓口端末ではありません"
);


return;

}



console.log(
"窓口端末認証OK"
);



}



checkDevice();
