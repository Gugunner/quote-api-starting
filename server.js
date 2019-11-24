const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getAllAuthorQuotes } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const sendQuoteObject ={
        quote: getRandomElement(quotes)
    }
    console.log(sendQuoteObject);
    res.status(200).send(sendQuoteObject);
});

app.get('/api/quotes', (req, res, next) => {
    if(Object.keys(req.query).length > 0) {
        const quotesToSend = {
            quotes: getAllAuthorQuotes(quotes, req.query.person)
        }
        console.log(quotesToSend);
        res.status(200).send(quotesToSend);
    } else {
        const quotesToSend = {
            quotes: quotes
        }
        console.log(quotesToSend);
        res.status(200).send(quotesToSend);
    }
});

app.post('/api/quotes', (req, res, next) => {
    if(req.query.quote && req.query.person) {
        console.log(req.query);
        quotes.push(req.query);
        const quoteAdded = {
            quote: req.query
        }
        res.status(201).send(quoteAdded);
    } else {
        res.status(400).send('Quote is missing data to be created');
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});