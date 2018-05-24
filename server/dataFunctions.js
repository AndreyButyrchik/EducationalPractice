const mongoose = require('mongoose');

const dataFunctions = (function dataFunctions() {
  const PostScheme = new mongoose.Schema({
    id: {
      type: String,
      unique: true,
    },
    descriprion: String,
    createdAt: Date,
    author: String,
    photoLink: String,
    hashtags: [String],
    likes: [String],
    removed: Boolean,
  });

  const Posts = mongoose.model('Posts', PostScheme);

  function validatePhotoPost(photoPost) {
    if (typeof photoPost === 'undefined' ||
      typeof photoPost.id !== 'string' ||
      typeof photoPost.descriprion !== 'string' ||
      typeof photoPost.createdAt !== 'object' ||
      typeof photoPost.author !== 'string' ||
      typeof photoPost.photoLink !== 'string' ||
      typeof photoPost.hashtags !== 'object' ||
      typeof photoPost.likes !== 'object') {
      return false;
    }
    if (Number(photoPost.id) < 1) {
      return false;
    }
    if (photoPost.descriprion.length >= 200 ||
      photoPost.descriprion.length === 0) {
      return false;
    }
    if (photoPost.author.length === 0) {
      return false;
    }
    if (photoPost.photoLink.length === 0) {
      return false;
    }
    if (!(photoPost.createdAt instanceof Date)) {
      return false;
    }
    if (!(photoPost.hashtags instanceof Array)) {
      return false;
    }
    if (!(photoPost.hashtags instanceof Array)) {
      return false;
    }
    return photoPost.hashtags.every(item => (item.charAt(0) === '#' && item.length > 1));
  }

  async function getUniqueId() {
    let cursor = await Posts.find({})
      .cursor();
    let maxID = 0;
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      maxID = Math.max(parseInt(doc.id, 10), maxID);
    }
    if (maxID) {
      return (maxID + 1).toString();
    }
    return false;
  }

  async function getPhotoPost(requestId) {
    let post = await Posts.findOne({ id: requestId });
    if (post) {
      return post;
    }
    return false;
  }

  async function addPhotoPost(photoPost) {
    let uniqueId = await getUniqueId();
    photoPost.id = uniqueId;
    photoPost.likes = [];
    if (validatePhotoPost(photoPost)) {
      const post = new Posts({
        id: uniqueId,
        descriprion: photoPost.descriprion,
        createdAt: new Date(),
        author: photoPost.author,
        photoLink: photoPost.photoLink,
        hashtags: photoPost.hashtags,
        likes: photoPost.likes,
        removed: false,
      });
      await post.save((err) => {
        if (err) {
          throw new Error(err);
        }
      });
      return true;
    }
    return false;
  }

  async function getPhotoPosts(sk, tp, filterConfig) {
    let skip = sk;
    let top = tp;
    if (!Number.isInteger(skip)) {
      skip = 0;
    }

    if (!Number.isInteger(top)) {
      top = 8;
    }

    let query = { removed: false };
    if (filterConfig.hashtags.length !== 0) {
      query.hashtags = { $in: filterConfig.hashtags };
    }
    if (filterConfig.author.length !== 0) {
      query.author = filterConfig.author;
    }
    if (filterConfig.createdAt instanceof Date) {
      let nextDay = new Date(filterConfig.createdAt);
      nextDay.setDate(filterConfig.createdAt.getDate() + 1);
      query.createdAt = {
        $gte: filterConfig.createdAt,
        $lt: nextDay,
      };
    }

    let posts = await Posts.find(query)
      .sort([['createdAt', -1]])
      .skip(skip)
      .limit(top);
    if (posts) {
      return posts;
    }
    return false;
  }

  async function removePhotoPost(requestId) {
    if (typeof requestId === 'undefined' ||
      typeof requestId !== 'string' ||
      Number(requestId) < 1) {
      return false;
    }

    let isRemoved = await Posts.remove({ id: requestId });
    return !!isRemoved;
  }

  async function editPost(requestId, photoPost) {
    let isEdit = await Posts.findOneAndUpdate({ id: requestId }, {
      $set: {
        descriprion: photoPost.descriprion,
        hashtags: photoPost.hashtags,
        photoLink: photoPost.photoLink,
        likes: photoPost.likes,
        createdAt: new Date(),
      },
    });
    return !!isEdit;
  }

  async function getUniqueNames() {
    let cursor = await Posts.find({})
      .cursor();
    const uniqueNames = new Set();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      uniqueNames.add(doc.author);
    }
    return uniqueNames ? Array.from(uniqueNames) : false;
  }

  async function getUniqueHashtags() {
    let cursor = await Posts.find({})
      .cursor();
    const uniqueHashtags = new Set();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      doc.hashtags.forEach((hashtag) => {
        uniqueHashtags.add(hashtag);
      });
    }
    return uniqueHashtags ? Array.from(uniqueHashtags) : false;
  }

  async function likePost(requestId, user) {
    const post = await getPhotoPost(requestId);
    if (post) {
      const idxUser = post.likes.indexOf(user);
      if (idxUser === -1) {
        post.likes.push(user);
        let isEdit = await Posts.findOneAndUpdate({ id: requestId }, {
          $set: {
            likes: post.likes,
          },
        });
        return isEdit ? 1 : false;
      }
      post.likes.splice(idxUser, 1);
      let isEdit = await Posts.findOneAndUpdate({ id: requestId }, {
        $set: {
          likes: post.likes,
        },
      });
      return isEdit ? 2 : false;
    }
    return false;
  }

  return {
    getPhotoPost,
    removePhotoPost,
    addPhotoPost,
    editPost,
    getPhotoPosts,
    getUniqueNames,
    getUniqueHashtags,
    likePost,
  };
}());

module.exports = dataFunctions;
