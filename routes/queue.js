const express = require('express');
const router = express.Router();

// router.get('/', function(req, res, next) {
//     res.send('Log-Pipeline');
// });

//neue Nachricht in queue schreiben
router.post('/push' , newMessage)
//auslesen einer Nachricht in der queue
router.get('/pop', readMessage)
//Anzahl der Nachrichten in der Queue
router.get('/count', messageCount)

const queue = []
//queue weiß nichts über messag, hat aber metadaten zb sender:
/* POST /push
    {
      msg:"..."
    }
 */
function newMessage(req,res){
    const message = req.body.msg
    queue.push(message) //fügt Nachricht am Ende des arrays hinzu
    res.json(true)  //true = für uns: message gepeichert
}

function  readMessage(req, res){
    const message = queue.shift() //wie pop in java
    if (typeof message === "undefined"){
        res.status(204) //status no content
        //express wartet trotzdem auf Antwort
        res.end() //express weiß dass jetzt beendet, würde sonst weiter warten
    } else {
        res.json(message)
    }
}

function messageCount(req,res){
    //wir liefern Json objekt mit Anzahl, kann später durch andere attribute erweitert werden
    res.json({
        count: queue.length
    })
}

module.exports = router;
