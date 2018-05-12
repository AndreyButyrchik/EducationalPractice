const fs = require('fs');

const dataFunctions = (function dataFunctions() {
  function readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  function writeFile(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, 'utf8', (err, d) => {
        if (err) {
          reject(err);
        } else {
          resolve(d);
        }
      });
    });
  }

  function parseDate(key, value) {
    if (key === 'createdAt' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }

  function validateNumber(numb) {
    return !Number.isInteger(numb);
  }

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
    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const postsArray = JSON.parse(jsonPosts, parseDate);
    let id = 0;
    postsArray.forEach((post) => {
      id = Math.max(parseInt(post.id, 10), id);
    });
    id += 1;
    return id.toString();
  }

  async function getPhotoPost(id) {
    if (typeof id !== 'string' ||
        Number(id) < 1) {
      return false;
    }
    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const posts = JSON.parse(jsonPosts, parseDate);
    const sourcePost = posts.find(post => id === post.id);
    if (sourcePost && (sourcePost.removed === false)) {
      return JSON.stringify(sourcePost);
    }
    return false;
  }

  async function addPhotoPost(pp) {
    const photoPost = pp;
    try {
      photoPost.id = await getUniqueId();
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    if (validatePhotoPost(photoPost)) {
      let jsonPosts;
      try {
        jsonPosts = await readFile('./data/photoPosts.json');
      } catch (err) {
        throw new Error(`Ooops ${err}`);
      }
      const posts = JSON.parse(jsonPosts, parseDate);
      posts.push(photoPost);
      try {
        await writeFile('./data/photoPosts.json', JSON.stringify(posts));
        return true;
      } catch (err) {
        throw new Error(`Ooops ${err}`);
      }
    }
    return false;
  }

  async function getPhotoPosts(sk, tp, filterConfig) {
    let skip = sk;
    let top = tp;
    if (validateNumber(skip)) {
      skip = 0;
    }


    if (validateNumber(top)) {
      top = 8;
    }

    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const postsArray = JSON.parse(jsonPosts, parseDate);

    let filtPhotoPosts = postsArray.sort((a, b) => b.createdAt - a.createdAt);


    if (typeof filterConfig === 'object') {
      if (filterConfig.createdAt &&
          typeof filterConfig.createdAt === 'object' &&
          filterConfig.createdAt instanceof Date) {
        filtPhotoPosts = filtPhotoPosts.filter(item =>
          item.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
          item.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
          item.createdAt.getDate() === filterConfig.createdAt.getDate());
      }


      if (filterConfig.author &&
          typeof filterConfig.author === 'string' &&
          filterConfig.author.length !== 0) {
        filtPhotoPosts = filtPhotoPosts.filter(item => item.author === filterConfig.author);
      }


      if (filterConfig.hashtags &&
          typeof filterConfig.hashtags === 'object' &&
          filterConfig.hashtags instanceof Array) {
        filtPhotoPosts = filtPhotoPosts.filter((item) => {
          let correctHashtags = true;
          filterConfig.hashtags.forEach((hashtag) => {
            if (item.hashtags.indexOf(hashtag) === -1) {
              correctHashtags = false;
            }
          });
          return correctHashtags;
        });
      }
    }

    filtPhotoPosts = filtPhotoPosts.filter(item => item.removed === false);

    if (filtPhotoPosts.length !== 0) {
      return JSON.stringify(filtPhotoPosts.slice(skip, skip + top));
    }
    return false;
  }

  async function removePhotoPost(id) {
    if (typeof id === 'undefined' ||
        typeof id !== 'string' ||
        Number(id) < 1) {
      return false;
    }
    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const posts = JSON.parse(jsonPosts, parseDate);
    const removePost = posts.find(post => id === post.id);
    if (removePost !== undefined) {
      removePost.removed = true;
      await writeFile('./data/photoPosts.json', JSON.stringify(posts));
      return true;
    }
    return false;
  }

  async function editPost(id, photoPost) {
    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const posts = JSON.parse(jsonPosts, parseDate);
    let postIsEdit = false;
    const editedPost = posts.find(post => id === post.id);
    if (validatePhotoPost(editedPost)) {
      if (photoPost.descriprion &&
          photoPost.descriprion.length < 200 &&
          photoPost.descriprion.length !== 0) {
        editedPost.descriprion = photoPost.descriprion;
        postIsEdit = true;
      }
      if (photoPost.photoLink &&
          photoPost.photoLink.length !== 0) {
        editedPost.photoLink = photoPost.photoLink;
        postIsEdit = true;
      }
      if (photoPost.hashtags &&
          photoPost.hashtags.length !== 0) {
        editedPost.hashtags = photoPost.hashtags;
        postIsEdit = true;
      }
      if (photoPost.likes &&
          editedPost.likes !== photoPost.likes) {
        editedPost.likes = photoPost.likes;
      }
      try {
        await writeFile('./data/photoPosts.json', JSON.stringify(posts));
      } catch (err) {
        throw new Error(`Ooops ${err}`);
      }
      return postIsEdit;
    }
    return false;
  }

  async function getUniqueNames() {
    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const posts = JSON.parse(jsonPosts, parseDate);

    const uniqueNames = new Set();
    posts.forEach((item) => {
      uniqueNames.add(item.author);
    });
    if (uniqueNames.length !== 0) {
      return JSON.stringify(Array.from(uniqueNames));
    }
    return false;
  }

  async function getUniqueHashtags() {
    let jsonPosts;
    try {
      jsonPosts = await readFile('./data/photoPosts.json');
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    const posts = JSON.parse(jsonPosts, parseDate);

    const uniqueHashtags = new Set();
    posts.forEach((item) => {
      if (!item.removed) {
        item.hashtags.forEach((hashtag) => {
          uniqueHashtags.add(hashtag);
        });
      }
    });
    if (uniqueHashtags.length !== 0) {
      return JSON.stringify(Array.from(uniqueHashtags));
    }
    return false;
  }

  async function likePost(id, user) {
    let jsonPost;
    try {
      jsonPost = await getPhotoPost(id);
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    if (jsonPost) {
      const post = JSON.parse(jsonPost, parseDate);
      const idxUser = post.likes.indexOf(user);
      if (idxUser === -1) {
        post.likes.push(user);
        if (await editPost(id, post)) {
          return 1;
        }
      }

      post.likes.splice(idxUser, 1);
      if (await editPost(id, post)) {
        return 2;
      }
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
    likePost
  };
}());

module.exports = dataFunctions;
