package com.example.redmireader


import android.app.Activity
import android.os.Bundle
import android.nfc.NfcAdapter
import android.nfc.Tag
import android.widget.TextView


import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FieldValue




class MainActivity : Activity(){


private lateinit var text:TextView



private val db =
FirebaseFirestore.getInstance()




override fun onCreate(
savedInstanceState: Bundle?
){

super.onCreate(savedInstanceState)



text =
TextView(this)


text.text =
"カードをかざしてください"


setContentView(text)


}





override fun onNewIntent(
intent: android.content.Intent
){

super.onNewIntent(intent)



val tag =
intent.getParcelableExtra<Tag>(
NfcAdapter.EXTRA_TAG
)



if(tag != null){


val cardIdm =
tag.id.joinToString("")



sendCard(
cardIdm
)


}


}




private fun sendCard(
cardIdm:String
){



val data =
hashMapOf(

"cardIdm" to cardIdm,


"deviceId" to "redmi001",


"time" to FieldValue.serverTimestamp()

)




db.collection(
"card_scans"
)

.add(data)

.addOnSuccessListener{


text.text =
"""
読み取り成功

カード送信済み

$cardIdm
"""

}


.addOnFailureListener{


text.text =
"送信エラー"

}


}



}
