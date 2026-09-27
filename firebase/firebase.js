import { initializeApp }

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getFirestore

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {

getAuth

}

from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





const firebaseConfig = {


apiKey:
"AIzaSyBbiGQS6b6n3_tC5Hjso1x71vR7hicoKEQ",

authDomain:
"nfc-gate-system.firebaseapp.com",

projectId:
"nfc-gate-system",

storageBucket:
"nfc-gate-system.firebasestorage.app",

messagingSenderId:
"750413894977",

appId:
"1:750413894977:web:dd2b6c4eadd5a339c2bdc0"

};




const app =
initializeApp(firebaseConfig);



export const db =
getFirestore(app);



export const auth =
getAuth(app);
