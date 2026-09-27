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



document.getElementById(
"update"
).onclick =
async()=>{


const ref =
doc(
db,
"cards",
cardIdm
);


const snap =
await getDoc(ref);


const data =
snap.data();



data.contracts[0].endDate =
"2027-03-31";



await updateDoc(
ref,
data
);



alert(
"更新完了"
);


};
