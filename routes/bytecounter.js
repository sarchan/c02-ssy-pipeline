const express = require('express');
const router = express.Router();
const axios = require('axios')

//http://localhost:3000/bytecounter/ : steht als route in app.js; browser gibt / automatisch dazu, andere Programme aber nicht!
router.get('/', getCount)

let bytecount = 0;

function getCount(req, res) {
    res.json({
        bytecount: bytecount
    })
}

//POST http://localhost:3000/bytecounter/update
router.post('/update', updateCount)

function updateCount (req,res) {
    const bytes = req.body.bytes
    bytecount += bytes
    res.json(true)
}

// laufendes Aktualisieren von bytecount (polling von queue)

async function pollQueue(){ //mit axios
    const response = await axios.get('http://localhost:3000/queue/pop')
    if (response.status === 200){ //=== überprüft auch varablentyp, ansonsten "200" == 200 !!, webstorm warnt dann vor automat. konvertierung
        const  bytes = response.data.bytes //nicht response.body: axios macht daraus response.data
        bytecount += bytes
    }
}

function repeatForever(){
    pollQueue().then() //.then sagt: pollQueue ist fertig, bein then() könnte man sagen was dann passieren soll, hier nix
    setTimeout(repeatForever, 2000)//setzt timer, ruft dann wieder selbe Funktion auf)
}

repeatForever() //einmaliger aufruf zum starten

module.exports = router;
