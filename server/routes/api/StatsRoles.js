const express = require('express');
const mangodb = require('mongodb');

const router = express.Router();

// GET POSTS
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).sort({"_id.date": 1}).toArray());
})
// ADD POSTS
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).status;
})

async function loadPostsCollection(){
    const client = await mangodb.MongoClient.connect('mongodb://localhost:27017/discordDB', {
        useNewUrlParser: true
    });

    return client.db('discordDB').collection('StatsRoles')
}

module.exports = router;