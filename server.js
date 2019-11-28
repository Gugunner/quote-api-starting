const express = require('express');
const app = express();


const quotesRouter = require('./quotesRouter');
const fragmentsRouter = require('./fragmentsRouter');

app.use('/api/quotes', quotesRouter);
app.use('/api/fragments', fragmentsRouter);

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});