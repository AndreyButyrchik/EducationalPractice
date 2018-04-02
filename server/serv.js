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
    if (removePost !== undefined) {
        removePost.removed = true;
        fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
        return true;
    }
    return false;
}

function editPost(id, photoPost) {
    let jsonPosts = fs.readFileSync('./data/photoPosts.json');
    let posts = JSON.parse(jsonPosts, function (key, value) {
        if (key === 'createdAt') {
            return new Date(value);
        }
        return value;
    });
    let postIsEdit = false;
    let editPost = posts.find((post) => id === post.id);
    if (editPost !== undefined) {


        if (photoPost.descriprion &&
            photoPost.descriprion.length < 200 &&
            photoPost.descriprion.length !== 0) {
            editPost.descriprion = photoPost.descriprion;
            postIsEdit = true;
        }
        if (photoPost.photoLink &&
            photoPost.photoLink.length !== 0) {
            editPost.photoLink = photoPost.photoLink;
            postIsEdit = true;
        }
        if (photoPost.hashtags &&
            photoPost.hashtags.length !== 0) {
            editPost.hashtags = photoPost.hashtags;
            postIsEdit = true;
        }
        if (photoPost.likes &&
            editPost.likes !== photoPost.likes) {
            editPost.likes = photoPost.likes
        }
        fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
        return postIsEdit;
    }
    return false;
}

function getPhotoPostByIdx(idx) {
    let jsonPosts = fs.readFileSync('./data/photoPosts.json');
    let posts = JSON.parse(jsonPosts, function (key, value) {
        if (key === 'createdAt') {
            return new Date(value);
        }
        return value;
    });
    return JSON.stringify(posts[idx]);
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
    if (deletePhotoPost(req.params.id)) {
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
});

app.put('/editPost/:id', function (req, res) {
    if (editPost(req.params.id, req.body)) {
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
});

app.get('/postsLength', function (req, res) {
    let jsonPosts = fs.readFileSync('./data/photoPosts.json');
    let posts = JSON.parse(jsonPosts, function (key, value) {
        if (key === 'createdAt') {
            return new Date(value);
        }
        return value;
    });
    posts.length.toString() ? res.send(posts.length.toString()) : res.status(404).end();
});

app.get('/getPostByIdx/:id', function (req, res) {
    let post = getPhotoPostByIdx(req.params.id);
    post ? res.send(post) : res.status(404).end();
});

app.listen(3000, function () {
    console.log('Server is running...');
});