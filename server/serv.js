const express = require('express');
const bodyParser = require('body-parser');
const dataFunctions = require('./dataFunctions');
const longPolingPosts = require('./longPolingPosts');

const app = express();

app.use(bodyParser.json({limit: '50mb', reviver: parseDate}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(express.static('../public'));

function parseDate(key, value) {
    if (key === 'createdAt' && typeof value === 'string') {
        return new Date(value);
    }
    return value;
}

app.get('/getPost', function (req, res) {
    let post = dataFunctions.getPhotoPost(req.query.id);
    post ? res.send(post) : res.status(404).end();
});

app.post('/getPosts', (req, res) => {
    let skip = parseInt(req.query.skip);
    let top = parseInt(req.query.top);
    let photoPosts = dataFunctions.getPhotoPosts(skip, top, req.body);
    photoPosts ? res.send(photoPosts) : res.status(404).end();
});

app.post('/addPost', (req, res) => {
    let addPost = dataFunctions.addPhotoPost(req.body);
    if (addPost) {
        longPolingPosts.clients.forEach(function (item) {
            item.send(req.body);
        });
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
});

app.delete('/delete', function (req, res) {
    dataFunctions.removePhotoPost(req.query.id) ? res.status(200).end() : res.status(404).end();
});

app.put('/editPost', function (req, res) {
    dataFunctions.editPost(req.query.id, req.body) ? res.status(200).end() : res.status(404).end();
});

app.get('/likePost', function (req, res) {
    let like = dataFunctions.likePost(req.query.id, req.query.user);
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

app.get('/getUniqueNames', function (req, res) {
    let names = dataFunctions.getUniqueNames();
    names ? res.send(names) : res.status(404).end();
});

app.get('/getUniqueHashtags', function (req, res) {
    let hashtags = dataFunctions.getUniqueHashtags();
    hashtags ? res.send(hashtags) : res.status(404).end();
});

app.get('/getNewPost', function (req, res) {
    longPolingPosts.subscribe(res);
});

app.listen(3000, function () {
    console.log('Server is running...');
});