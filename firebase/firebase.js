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
"YOUR_API_KEY",

authDomain:
"nfc-gate-system.firebaseapp.com",

projectId:
"nfc-gate-system",

storageBucket:
"nfc-gate-system.firebasestorage.app",

messagingSenderId:
"750413894977",

appId:
"YOUR_APP_ID"

};




const app =
initializeApp(firebaseConfig);



export const db =
getFirestore(app);



export const auth =
getAuth(app);
