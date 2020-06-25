const express = require('express');
const router = express.Router();
const axios = require('axios')

// router.get('/', function(req, res, next) {
//     res.send('Log-Pipeline');
// });

//neue Nachricht in queue schreiben
router.post('/publish' , newMessage)

//registrierte subscriber: normalerweise mit endpunkt subscribe/unsubscribe registrieren bzw. abmelden, hier bei uns: hardcoded
const subscribers = ['http://localhost:3000/bytecounter/update']
//queue weiß nichts über messag, hat aber metadaten zb sender:
/* POST /push
    {
      msg:"..."
    }
 */
async function newMessage(req,res){
    const message = req.body.msg

    for (let subscriber of subscribers){
        await axios.post(subscriber, message)
    }
}



module.exports = router;
