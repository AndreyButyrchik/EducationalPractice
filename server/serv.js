const express = require('express');
const bodyParser = require('body-parser');
const dataFunctions = require('./dataFunctions');
const longPolingPosts = require('./longPolingPosts');
const multer = require('multer');

const app = express();

function parseDate(key, value) {
  if (key === 'createdAt' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
}

app.use(bodyParser.json({ reviver: parseDate }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../public'));

const multerConfig = {

  storage: multer.diskStorage({
    destination(req, file, next) {
      next(null, './data/images');
    },

    filename(req, file, next) {
      next(null, `${file.originalname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
  }),

  fileFilter(req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      next(null, true);
      return true;
    }
    return next();
  }
};

app.get('/image/:name', (req, res, next) => {
  const options = {
    root: `${__dirname}/data/images/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  const fileName = req.params.name;
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    }
  });
});

app.get('/getNewPost', (req, res) => {
  longPolingPosts.subscribe(res);
});

app.get('/getPost', async (req, res) => {
  let post;
  try {
    post = await dataFunctions.getPhotoPost(req.query.id);
  } catch (err) {
    res.status(404).end();
  }
  if (await dataFunctions.getPhotoPost(req.query.id)) {
    res.send(post);
  } else {
    res.status(404).end();
  }
});

app.post('/getPosts', async (req, res) => {
  const skip = parseInt(req.query.skip, 10);
  const top = parseInt(req.query.top, 10);
  let photoPosts;
  try {
    photoPosts = await dataFunctions.getPhotoPosts(skip, top, req.body);
  } catch (err) {
    res.status(404).end();
  }
  if (photoPosts) {
    res.send(photoPosts);
  } else {
    res.status(404).end();
  }
});

app.post('/addPost', async (req, res) => {
  let addPost;
  try {
    addPost = await dataFunctions.addPhotoPost(req.body);
  } catch (err) {
    res.status(404).end();
  }
  if (addPost) {
    longPolingPosts.clients.forEach((item) => {
      item.send(req.body);
    });
    longPolingPosts.clearClients();
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.delete('/delete', async (req, res) => {
  try {
    if (await dataFunctions.removePhotoPost(req.query.id)) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(404).end();
  }
});

app.put('/editPost', async (req, res) => {
  try {
    if (await dataFunctions.editPost(req.query.id, req.body)) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(404).end();
  }
});

app.get('/likePost', async (req, res) => {
  let like;
  try {
    like = await dataFunctions.likePost(req.query.id, req.query.user);
  } catch (err) {
    res.status(404).end();
  }
  if (like) {
    if (like === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } else {
    res.status(404).end();
  }
});

app.get('/getUniqueNames', async (req, res) => {
  let names;
  try {
    names = await dataFunctions.getUniqueNames();
  } catch (err) {
    res.status(404).end();
  }
  if (names) {
    res.send(names);
  } else {
    res.status(404).end();
  }
});

app.get('/getUniqueHashtags', async (req, res) => {
  let hashtags;
  try {
    hashtags = await dataFunctions.getUniqueHashtags();
  } catch (err) {
    res.status(404).end();
  }
  if (hashtags) {
    res.send(hashtags);
  } else {
    res.status(404).end();
  }
});

app.post('/uploadPhoto', multer(multerConfig).single('upPhoto'), (req, res) => {
  const name = req.file.filename;
  res.send(`/image/${name}`);
});

app.listen(3000, () => {
  console.log('Server is running...');
});
