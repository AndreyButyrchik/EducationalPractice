const express = require('express');
const fs = require('fs');

const app = express();

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

app.use(express.static('../public'));

app.get('/getPost/:id', function (req, res) {
    let post = getPhotoPost(req.params.id);
    res.send(post);
    // post ? res.send(post) : res.status(404).end();
});

app.listen(3000, function () {
    console.log('Server is running...');
});