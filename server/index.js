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

const MessageFaction = require('./routes/api/MessageFaction');
app.use('/api/MessageFaction', MessageFaction);

const Stats = require('./routes/api/Stats');
app.use('/api/Stats', Stats);

const StatsRoles = require('./routes/api/StatsRoles');
app.use('/api/StatsRoles', StatsRoles);

const ChannelsList = require('./routes/api/ChannelsList');
app.use('/api/ChannelsList', ChannelsList);


const port = process.env.port || 5000;


app.listen(port, () => console.log(`server started on port ${port}`))