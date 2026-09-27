import {

login

}

from
"../firebase/auth.js";



document.getElementById(
"login"
).onclick =

async()=>{


const email =
document.getElementById(
"email"
).value;



const password =
document.getElementById(
"password"
).value;



try{


await login(
email,
password
);



location.href =
"../admin/index.html";



}

catch(e){


document.getElementById(
"message"
).innerHTML =

"ログインできません";


}


};
