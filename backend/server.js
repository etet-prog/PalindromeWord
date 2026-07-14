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
let result = {msg: null};

app.post('/message-post', (req, res) => {
    data.message = req.body.message;    
    setTimeout(() => {
        console.log(`[>] New Message: ${data.message}`);
        data.status = "Sent";
        res.send(JSON.stringify({"response": "Sent"}));
    }, randInt(5, ms=true));
});

app.get('/message-get', (req, res) => {
    res.send(JSON.stringify(data));
});

app.get('/status-get', (req, res) => {
    res.send(JSON.stringify(data));
});

app.post('/status-post', (req, res) => {
    data.status = req.body.status;
    res.send(true);
});

app.post('/is-palindrome', (req, res) => {
    result.msg = req.body.is_palindrome;
    console.log(result.msg);
    res.send(true);
});

app.get('/result-get', (req, res)=> {
    setTimeout(() => {
        res.send(JSON.stringify(result));
    }, randInt(5, ms=true));
});

app.listen(9090);