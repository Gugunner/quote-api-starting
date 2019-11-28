const express = require('express');
const fragmentsRouter = express.Router();

const { fragments } = require('./additionalData');
const { getRandomElement, getAllPersonData, addIDs, checkForExistingId, getIndex } = require('./utils');

console.log(addIDs(fragments));


fragmentsRouter.get('/random', (req, res, next) => {
    const sendFragmentObject ={
        fragment: getRandomElement(fragments)
    }
    // console.log(sendQuoteObject);
    res.status(200).send(sendFragmentObject);
});

fragmentsRouter.get('/', (req, res, next) => {
    if(Object.keys(req.query).length > 0) {
        const fragmentsToSend = {
            fragments: getAllPersonData(fragments, req.query.person)
        }
        console.log(fragmentsToSend);
        res.status(200).send(fragmentsToSend);
    } else {
        const fragmentsToSend = {
            fragments: fragments
        }
        console.log(fragmentsToSend);
        res.status(200).send(fragmentsToSend);
    }
});

fragmentsRouter.post('/', (req, res, next) => {
    if(req.query.quote && req.query.person && req.query.id) {
        // console.log(req.query);
        if(!checkForExistingId(fragments, req.query.id)) {
            const query = req.query
            query.id = Number(req.query.id);
            quotes.push(req.query);
            const fragmentsAdded = {
            fragments: query
        }
            res.status(201).send(fragmentsAdded);
        } else {
            console.log('Id cant be used');
            res.status(400).send('Id cant be used');
        }
    } else {
        res.status(400).send('Data is missing to be updated');
    }
});



fragmentsRouter.put('/', (req, res, next) => {
    console.log('Hello');
    if(req.query.quote && req.query.person && req.query.id) {
        const fragmentIndex = getIndex(fragments, req.query.id)
        if(fragmentIndex !== -1) {
            req.query.id = Number(req.query.id);
            Object.assign(fragments[fragmentIndex], req.query)
            const updatedFragment = {
                fragment: req.query
            }
            res.status(200).send(updatedFragment);
        } else {
            console.log('Id not found');
            res.status(400).send('Id not found');
        }
    } else {
        res.status(400).send('Data is missing to be updated');
    }
});

module.exports = fragmentsRouter;