let user = null;
let filterConfig = { createdAt: {}, author: '', hashtags: [] };

async function mainShowPhotoPosts(skip, top, filterConf, insertBefore) {
  let postsArray;
  try {
    postsArray = await moduleRequestFunctions.getPhotoPosts(skip, top, filterConf);
  } catch (err) {
    return false;
  }
  if (typeof postsArray === 'object') {
    moduleDomFunc.domShowPhotoPosts(postsArray, insertBefore);
    return true;
  }
  return false;
}

async function mainAddPhotoPost(PhotoPost, insertBefore) {
  try {
    if (await moduleRequestFunctions.addPhotoPost(PhotoPost)) {
      moduleDomFunc.addPhotoPost(PhotoPost, insertBefore);
      return true;
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
  return false;
}

async function mainEditPhotoPost(id, photoPost) {
  try {
    if (await moduleRequestFunctions.editPhotoPost(id, photoPost)) {
      moduleDomFunc.editPhotoPost(id, photoPost);
      return true;
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
  return false;
}

async function mainRemovePhotoPost(event) {
  const modalWindow = document.getElementById('modalWindowConfirmDelete');
  modalWindow.classList.remove('visible');
  modalWindow.classList.add('hidden');
  const id = event.target.value;
  try {
    if (await moduleRequestFunctions.removePhotoPost(id)) {
      moduleDomFunc.removePhotoPost(id);
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
  return false;
}

function mainShowElementsForUser() {
  if (user !== null) {
    moduleDomFunc.showElementsForAuthUser();
  } else {
    moduleDomFunc.showButtonSingIn();
  }
  try {
    return (moduleDomFunc.showFilterUsers() && moduleDomFunc.showFilterHashtags());
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
}

async function mainLikePost(event) {
  try {
    if (user !== null && event.target.classList.contains('fa-heart')) {
      if (await moduleRequestFunctions.likePhotoPost(this.id, user)) {
        moduleDomFunc.likePost(this.id);
      } else {
        moduleDomFunc.unLikePost(this.id);
      }
    }
  } catch (err) {
    throw new Error(`Ooops ${err}`);
  }
}

moduleRequestFunctions.getNewPosts();

if (!mainShowPhotoPosts(0, 8, filterConfig, true)) {
  throw new Error('Ooops');
}

mainShowElementsForUser();
