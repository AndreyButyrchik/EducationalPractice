const express = require('express');
const bodyParser = require('body-parser');
const dataFunctions = require('./dataFunctions');

const app = express();
const longPoll = require("express-longpoll")(app);

app.use(bodyParser.json({limit: '50mb', reviver: parseDate}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(express.static('../public'));
longPoll.create('/getNewPost')
    .catch((err) => {
        console.log('Something went wrong!', err);
    });

function parseDate(key, value) {
    if (key === 'createdAt' && typeof value === 'string') {
        return new Date(value);
    }
    return value;
}

// app.get('/getNewPost', function (req, res, next) {
//     console.log('subscribe');
//     longPolingPosts.subscribe(res);
// });

app.get('/getPost', async function (req, res) {
    let post;
    try {
        post = await dataFunctions.getPhotoPost(req.query.id);
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
    post ? res.send(post) : res.status(404).end();
});

app.post('/getPosts', async (req, res) => {
    let skip = parseInt(req.query.skip);
    let top = parseInt(req.query.top);
    let photoPosts = await dataFunctions.getPhotoPosts(skip, top, req.body);
    photoPosts ? res.send(photoPosts) : res.status(404).end();
});

app.post('/addPost', async (req, res) => {
    let addPost
    try {
        addPost = await dataFunctions.addPhotoPost(req.body);
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
    if (addPost) {
        // longPolingPosts.clients.forEach(function (item) {
        //     item.send(req.body);
        // });
        // longPolingPosts.clearClients();
        longPoll.publish('/getNewPost', req.body)
            .then(() => {
                console.log('send Data');
            })
            .catch((err) => {
                console.log('Something went wrong!', err);
            });

        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
});

app.delete('/delete', async function (req, res) {
    try {
        await dataFunctions.removePhotoPost(req.query.id) ? res.status(200).end() : res.status(404).end();
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
});

app.put('/editPost', async function (req, res) {
    try {
        await dataFunctions.editPost(req.query.id, req.body) ? res.status(200).end() : res.status(404).end();
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
});

app.get('/likePost', async function (req, res) {
    let like;
    try {
        like = await dataFunctions.likePost(req.query.id, req.query.user);
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
    if (like) {
        if (like === 1) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    else {
        res.status(404).end();
    }
});

app.get('/getUniqueNames', async function (req, res) {
    let names;
    try {
        names = await dataFunctions.getUniqueNames();
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
    names ? res.send(names) : res.status(404).end();
});

app.get('/getUniqueHashtags', async function (req, res) {
    let hashtags;
    try {
        hashtags = await dataFunctions.getUniqueHashtags();
    } catch (err) {
        console.log(`Ooops ${err}`);
        res.status(404).end();
    }
    hashtags ? res.send(hashtags) : res.status(404).end();
});

app.listen(3000, function () {
    console.log('Server is running...');
});