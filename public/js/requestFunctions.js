const requestFunctions = (function requestFunctions() {
  function parseDate(key, value) {
    if (key === 'createdAt' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }

  const getPhotoPost = function getPhotoPost(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/getPost/?id=${id}`, true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }

        resolve(JSON.parse(xhr.responseText, parseDate));
      };

      xhr.send();
    });
  };

  const getPhotoPosts = function getPhotoPosts(skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `/getPosts/?skip=${skip}&top=${top}`, true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }

        resolve(JSON.parse(xhr.responseText, parseDate));
      };

      xhr.send(JSON.stringify(filterConfig));
    });
  };

  const addPhotoPost = function addPhotoPost(photoPost) {
    return new Promise(((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/addPost', true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(true);
      };

      xhr.send(JSON.stringify(photoPost));
    }));
  };

  const removePhotoPost = function removePhotoPost(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `/delete/?id=${id}`, true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(true);
      };

      xhr.send();
    });
  };

  const editPhotoPost = function editPhotoPost(id, photoPost) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `/editPost/?id=${id}`, true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(true);
      };

      xhr.send(JSON.stringify(photoPost));
    });
  };

  const likePhotoPost = function likePhotoPost(id, user) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/likePost/?id=${id}&user=${user}`, true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(xhr.responseText === 'true');
      };

      xhr.send();
    });
  };

  const getUniqueNames = function getUniqueNames() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/getUniqueNames', true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(JSON.parse(xhr.responseText));
      };

      xhr.send();
    });
  };

  const getUniqueHashtags = function getUniqueHashtags() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/getUniqueHashtags', true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(JSON.parse(xhr.responseText));
      };

      xhr.send();
    });
  };

  const getNewPosts = function getNewPosts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/getNewPost');

    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        throw new Error('Invalid query');
      } else {
        const post = JSON.parse(xhr.responseText, utilities.parseDate);
        if (post.author !== user) {
          domFunc.addPhotoPost(post, true);
        }
      }
      getNewPosts();
    };
    xhr.send();
  };

  const uploadFile = function uploadFile(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/uploadPhoto', true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(xhr.responseText);
      };

      xhr.send(file);
    });
  };

  const logIn = function logIn(login, password) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/login', true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(xhr.responseText);
      };

      xhr.send(JSON.stringify({ username: login, password }));
    });
  };

  const logOut = function logOut() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/logout', true);

      xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
          reject(new Error('Invalid query'));
        }
        resolve(xhr.responseText);
      };

      xhr.send();
    });
  };

  return {
    getPhotoPost,
    removePhotoPost,
    addPhotoPost,
    editPhotoPost,
    getPhotoPosts,
    likePhotoPost,
    getUniqueNames,
    getUniqueHashtags,
    getNewPosts,
    uploadFile,
    logIn,
    logOut
  };
}());
