const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `${__dirname}/controllers/messages_controller` );
const createInitialsession = require ('./middlewares/session.js');
const app = express();
const filter = require ('./middlewares/filter.js');
const session = require ('express-session');

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );


app.use(session({
    secret: "vvvv",
    resave: false,
    unInitialize: false,
    cookie:{
        maxAge: 10000
    }
}))

app.use((req, res, next) => createInitialsession (req, res, next));
app.use((req, res, next) => {
    if (req.method === 'POST' || req.method == "PUT") {
        filter  (req, res, next);
    } else {
    next();
    }
})


const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

app.get('/api/messages/history', mc.history);

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );