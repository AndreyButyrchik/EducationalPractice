/* eslint-disable no-unused-vars,prefer-const */
let user = 'Галя Печка';
let filterConfig = { createdAt: {}, author: '', hashtags: [] };

async function showPhotoPosts(skip, top, filterConf, insertBefore) {
  let postsArray;
  try {
    postsArray = await requestFunctions.getPhotoPosts(skip, top, filterConf);
  } catch (err) {
    return false;
  }
  if (typeof postsArray === 'object') {
    domFunc.domShowPhotoPosts(postsArray, insertBefore);
    return true;
  }
  return false;
}

async function addPhotoPost(PhotoPost, insertBefore) {
  try {
    if (await requestFunctions.addPhotoPost(PhotoPost)) {
      domFunc.addPhotoPost(PhotoPost, insertBefore);
      return true;
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
  return false;
}

async function editPhotoPost(id, photoPost) {
  try {
    if (await requestFunctions.editPhotoPost(id, photoPost)) {
      domFunc.editPhotoPost(id, photoPost);
      return true;
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
  return false;
}

async function removePhotoPost(event) {
  const modalWindow = document.getElementById('modalWindowConfirmDelete');
  modalWindow.classList.remove('visible');
  modalWindow.classList.add('hidden');
  const id = event.target.value;
  try {
    if (await requestFunctions.removePhotoPost(id)) {
      domFunc.removePhotoPost(id);
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
  return false;
}

function showElementsForUser() {
  if (user !== '') {
    domFunc.showElementsForAuthUser();
  } else {
    domFunc.showButtonSingIn();
  }
  try {
    return (domFunc.showFilterUsers() && domFunc.showFilterHashtags());
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
}

async function likePost(event) {
  try {
    if (user !== null && event.target.classList.contains('fa-heart')) {
      if (await requestFunctions.likePhotoPost(this.id, user)) {
        domFunc.likePost(this.id);
      } else {
        domFunc.unLikePost(this.id);
      }
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
}

requestFunctions.getNewPosts();

if (!showPhotoPosts(0, 8, filterConfig, true)) {
  throw new Error('Ooops');
}

showElementsForUser();
