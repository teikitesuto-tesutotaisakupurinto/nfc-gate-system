import {

auth,
db

}

from
"../firebase/firebase.js";


import {

onAuthStateChanged

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

doc,
getDoc

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {

logout

}

from
"../firebase/auth.js";





onAuthStateChanged(

auth,

async(user)=>{


if(!user){


location.href =
"../login/index.html";


return;

}




const ref =
doc(

db,

"staffs",

user.uid

);



const snap =
await getDoc(ref);



if(!snap.exists()){


alert(
"スタッフ情報なし"
);


return;

}



const staff =
snap.data();



document.getElementById(
"staffName"
).innerHTML =

`

${staff.name} さん

権限：
${staff.role}

`;





// 一般スタッフ制限

if(
staff.role==="staff"
){


document.getElementById(
"service"
).style.display=
"none";


document.getElementById(
"staff"
).style.display=
"none";


}



});






document.getElementById(
"logout"
).onclick =

async()=>{


await logout();


location.href =
"../login/index.html";


};
