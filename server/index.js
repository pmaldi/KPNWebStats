const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MessageHorde = require('./routes/api/MessageHorde');
app.use('/api/MessageHorde', MessageHorde);

const MessageAlliance = require('./routes/api/MessageAlliance');
app.use('/api/MessageAlliance', MessageAlliance);

const port = process.env.port || 5000;


app.listen(port, () => console.log(`server started on port ${port}`))