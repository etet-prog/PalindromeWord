const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

function randInt(range, ms=false) {
    let random = Math.floor(Math.random() * range + 1);
    if (ms) {
        random *= 1000;
    }
    return random;
}

let data = {message: null, status : null};
let result = {word: null};

app.post('/message', (req, res) => {
    data.message = req.body.message;    
    setTimeout(() => {
        console.log(`[>] New Message: ${data.message}`);
        data.status = "Sent";
        res.json({server : "Server Received"});
    }, randInt(5, ms=true));
});

app.get('/message', (req, res) => {
    res.json(data);
});

app.get('/status', (req, res) => {
    res.json(data);
});

app.post('/status', (req, res) => {
    data.status = req.body.status;
    res.json({server : "Status Received"});
});

app.post('/is-palindrome', (req, res) => {
    result.word = req.body.word;
    console.log(result.word);
    res.json({server : "Result Received"});
});

app.get('/result', (req, res)=> {
    setTimeout(() => {
        res.json(result);
    }, randInt(5, ms=true));
});

app.listen(9090);