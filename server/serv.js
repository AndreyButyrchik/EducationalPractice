const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('../public'));

function getPhotoPost(id) {
    let jsonPosts = fs.readFileSync('./data/photoPosts.json');
    let posts = JSON.parse(jsonPosts, function (key, value) {
        if (key === 'createdAt') {
            return new Date(value);
        }
        return value;
    });
    return JSON.stringify(posts.find((post) => id === post.id));
}

function addPhotoPost(photoPost) {
    let jsonPosts = fs.readFileSync('./data/photoPosts.json');
    let posts = JSON.parse(jsonPosts, function (key, value) {
        if (key === 'createdAt') {
            return new Date(value);
        }
        return value;
    });
    posts.push(photoPost);
    fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
}

function deletePhotoPost(id) {
    let jsonPosts = fs.readFileSync('./data/photoPosts.json');
    let posts = JSON.parse(jsonPosts, function (key, value) {
        if (key === 'createdAt') {
            return new Date(value);
        }
        return value;
    });
    let removePost = posts.find((post) => id === post.id);
    removePost.removed = true;
    fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
}

app.get('/getPost/:id', function (req, res) {
    let post = getPhotoPost(req.params.id);
    post ? res.send(post) : res.status(404).end();
});

app.post('/addPost', (req, res) => {
    addPhotoPost(req.body);
    res.status(200).end();
});

app.delete('/delete/:id', function (req, res) {
    deletePhotoPost(req.params.id);
    res.status(200).end();
});

app.listen(3000, function () {
    console.log('Server is running...');
});