const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const passport = require('passport');
const session = require('express-session');
const JsonStrategy = require('passport-json').Strategy;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

async function connectDatabase() {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/PhotoPortal')
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      throw new Error(err);
    });
  mongoose.Promise = global.Promise;
}

const verification = require('./verification');
const dataFunctions = require('./dataFunctions');
const longPolingPosts = require('./longPolingPosts');

function parseDate(key, value) {
  if (key === 'createdAt' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
}

const app = express();
app.use(bodyParser.json({ reviver: parseDate }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../public'));
app.use(cookieParser());
app.use(session({ secret: 'wildCherry' }));
app.use(passport.initialize());
app.use(passport.session());

const multerConfig = {

  storage: multer.diskStorage({
    destination(req, file, next) {
      next(null, './data/images');
    },

    filename(req, file, next) {
      next(null, `${file.originalname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
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
  },
};

passport.serializeUser((user, done) => {
  // Set-Cookie: sessionid = user.sessionId;
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new JsonStrategy(async (username, password, done) => {
  try {
    const user = await verification.verifyPassword(username, password);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
}));

app.post('/login', passport.authenticate('json', { failureRedirect: '/loginfail' }), (req, res) => {
  res.redirect('/');
});

app.get('/loginfail', (req, res) => {
  res.json(200, false);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json(200, true);
});

app.get('/image/:name', (req, res, next) => {
  const options = {
    root: `${__dirname}/data/images/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
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

connectDatabase();
