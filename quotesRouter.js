const express = require('express');
const quotesRouter = express.Router();

const { quotes } = require('./data');
const { getRandomElement, getAllPersonData, addIDs, checkForExistingId, getIndex } = require('./utils');

console.log(addIDs(quotes));


quotesRouter.get('/random', (req, res, next) => {
    const sendQuoteObject ={
        quote: getRandomElement(quotes)
    }
    // console.log(sendQuoteObject);
    res.status(200).send(sendQuoteObject);
});

quotesRouter.get('/', (req, res, next) => {
    if(Object.keys(req.query).length > 0) {
        const quotesToSend = {
            quotes: getAllPersonData(quotes, req.query.person)
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

quotesRouter.post('/', (req, res, next) => {
    if(req.query.quote && req.query.person && req.query.id) {
        // console.log(req.query);
        if(!checkForExistingId(quotes, req.query.id)) {
            const query = req.query
            query.id = Number(req.query.id);
            quotes.push(req.query);
            const quoteAdded = {
            quote: query
        }
            res.status(201).send(quoteAdded);
        } else {
            console.log('Id cant be used');
            res.status(400).send('Id cant be used');
        }
    } else {
        res.status(400).send('Data is missing to be updated');
    }
});



quotesRouter.put('/', (req, res, next) => {
    console.log('Hello');
    if(req.query.quote && req.query.person && req.query.id) {
        const quoteIndex = getIndex(quotes, req.query.id)
        if(quoteIndex !== -1) {
            req.query.id = Number(req.query.id);
            Object.assign(quotes[quoteIndex], req.query)
            const updatedQuote = {
                quote: req.query
            }
            res.status(200).send(updatedQuote);
        } else {
            console.log('Id not found');
            res.status(400).send('Id not found');
        }
    } else {
        res.status(400).send('Data is missing to be updated');
    }
});

module.exports = quotesRouter;