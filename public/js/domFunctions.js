const domFunc = (function domFunc() {
  function showUserName() {
    const header = document.getElementsByTagName('header')[0];
    const headerUserName = document.createElement('div');
    const userName = document.createElement('h1');
    headerUserName.className = 'headerUserName';
    userName.textContent = user;
    headerUserName.appendChild(userName);
    header.insertBefore(headerUserName, header.childNodes[0]);
  }

  function showButtonAddFoto() {
    const header = document.getElementsByTagName('header')[0];
    const headerAddFoto = document.createElement('div');
    headerAddFoto.className = 'headerAddFoto';
    const addFotoImg = document.createElement('i');
    addFotoImg.className = 'fas fa-plus-circle';
    addFotoImg.style.cursor = 'pointer';
    addFotoImg.onclick = events.eShowModalAddPost;
    headerAddFoto.appendChild(addFotoImg);
    header.appendChild(headerAddFoto);
  }

  function showButtonSignIn() {
    const header = document.getElementsByTagName('header')[0];
    const headerSingIn = document.createElement('div');
    headerSingIn.className = 'headerSingInOut';
    const singInImg = document.createElement('i');
    singInImg.className = 'fas fa-sign-out-alt';
    singInImg.onclick = events.logOut;
    singInImg.style.cursor = 'pointer';
    headerSingIn.appendChild(singInImg);
    header.appendChild(headerSingIn);
  }

  function showButtonEditPost(item) {
    const commentBox = item.getElementsByClassName('commentBox')[0];
    const editImage = document.createElement('i');
    editImage.className = 'fas fa-edit';
    editImage.onclick = events.eShowModalEditPost;
    item.insertBefore(editImage, commentBox);
  }

  function showButtonTrash(item) {
    const commentBox = item.getElementsByClassName('commentBox')[0];
    const trashImage = document.createElement('i');
    trashImage.className = 'fas fa-trash-alt';
    trashImage.style.cursor = 'pointer';
    trashImage.onclick = events.showModalRemovePost;
    item.insertBefore(trashImage, commentBox);
  }

  const addPhotoPost = function addPhotoPost(photoPost, insertBefore) {
    const main = document.getElementsByTagName('main')[0];
    const template = document.getElementById('templatePost');
    const newPost = template.content.cloneNode(true).childNodes[1];
    const heart = newPost.getElementsByClassName('fa-heart')[0];
    events.eLikePost(newPost);
    newPost.id = photoPost.id;
    newPost.childNodes[1].textContent = photoPost.author;
    newPost.childNodes[3].firstChild.src = photoPost.photoLink;
    newPost.childNodes[7].firstChild.textContent = photoPost.descriprion;
    newPost.childNodes[9].firstChild.textContent = photoPost.hashtags.join(' ');
    newPost.childNodes[11].firstChild.textContent = `Фото было опубликовано ${utilities.formatDate(photoPost.createdAt)}`;
    if (user === photoPost.author) {
      showButtonEditPost(newPost);
      showButtonTrash(newPost);
    }
    if (photoPost.likes.indexOf(user) !== -1) {
      heart.className = 'fas fa-heart like';
    }
    if (insertBefore) {
      main.insertBefore(newPost, main.childNodes[3]);
    } else {
      main.insertBefore(newPost, main.childNodes[main.childNodes.length - 2]);
    }
  };

  const domShowPhotoPosts = function domShowPhotoPosts(postsArray, insertBefore) {
    if (insertBefore) {
      postsArray.reverse();
    }
    postsArray.forEach((item) => {
      addPhotoPost(item, insertBefore);
    });
  };

  const removePhotoPost = function removePhotoPost(id) {
    const removePost = document.getElementById(id);
    removePost.remove();
  };

  const editPhotoPost = function editPhotoPost(id, photoPost) {
    const editPost = document.getElementById(id);
    if (photoPost.descriprion &&
      photoPost.descriprion.length < 200 &&
      photoPost.descriprion.length !== 0) {
      const descriptionBox = editPost.getElementsByClassName('commentBox');
      const description = descriptionBox[0].firstChild;
      description.textContent = photoPost.descriprion;
    }
    if (photoPost.photoLink &&
      photoPost.photoLink.length !== 0) {
      const photoBox = editPost.getElementsByClassName('fotoSpace');
      const photo = photoBox[0].firstChild;
      photo.src = photoPost.photoLink;
    }
    if (photoPost.hashtags &&
      photoPost.hashtags.length !== 0) {
      const hashtagsBox = editPost.getElementsByClassName('hashtagsBox');
      const hashtags = hashtagsBox[0].firstChild;
      hashtags.textContent = photoPost.hashtags.join(' ');
    }
  };

  const showElementsForAuthUser = function showElementsForAuthUser() {
    showUserName();
    showButtonAddFoto();
    showButtonSignIn();

    const buttonSingIn = document.getElementsByClassName('fa-sign-in-alt')[0];
    if (buttonSingIn !== undefined) {
      buttonSingIn.remove();
    }

    const posts = document.getElementsByClassName('postBox');
    [].forEach.call(posts, async (item) => {
      const author = item.childNodes[1].textContent;
      if (author === user && (item.getElementsByClassName('fa-trash-alt')[0]) === undefined) {
        showButtonEditPost(item);
        showButtonTrash(item);
      }
      const idPost = item.id;

      let dataPost;
      try {
        dataPost = await requestFunctions.getPhotoPost(idPost);
      } catch (err) {
        throw new Error(`Ooops ${err}`);
      }
      if (dataPost.likes.indexOf(user) !== -1) {
        const heart = item.getElementsByClassName('fa-heart')[0];
        heart.className = 'fas fa-heart like';
      }
    });
  };

  const showFilterUsers = async function showFilterUsers() {
    const dataUsers = document.getElementById('userNames');

    let uniqueNames;
    try {
      uniqueNames = await requestFunctions.getUniqueNames();
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }
    uniqueNames.forEach((item) => {
      const userName = document.createElement('option');
      userName.value = item;
      dataUsers.appendChild(userName);
    });
    return true;
  };

  const showFilterHashtags = async function showFilterHashtags() {
    const dataUsers = document.getElementById('hashtags');
    let uniqueHashtags;
    try {
      uniqueHashtags = await requestFunctions.getUniqueHashtags();
    } catch (err) {
      throw new Error(`Ooops ${err}`);
    }

    uniqueHashtags.forEach((item) => {
      const hashtag = document.createElement('option');
      hashtag.value = item;
      dataUsers.appendChild(hashtag);
    });
  };

  const likePost = function likePost(id) {
    const post = document.getElementById(id);
    const heart = post.getElementsByClassName('fa-heart')[0];
    heart.className = 'fas fa-heart like';
  };

  const unLikePost = function unLikePost(id) {
    const post = document.getElementById(id);
    const heart = post.getElementsByClassName('fa-heart')[0];
    heart.className = 'fas fa-heart unlike';
  };

  const showButtonSingIn = function showButtonSingIn() {
    const header = document.getElementsByTagName('header');
    const headerSingOut = document.createElement('div');
    headerSingOut.className = 'headerSingInOut';
    const singOutImg = document.createElement('i');
    singOutImg.className = 'fas fa-sign-in-alt';
    singOutImg.style.cursor = 'pointer';
    singOutImg.addEventListener('click', events.eSingIn);
    headerSingOut.appendChild(singOutImg);
    header[0].appendChild(headerSingOut);
    const portalName = document.querySelector('.headerPortalName');
    portalName.style.width = '90vw';
  };

  const resetPosts = function resetPosts() {
    const postList = document.getElementsByClassName('postBox');
    const posts = Array.prototype.slice.call(postList);
    posts.forEach((post) => {
      post.remove();
    });
  };

  const filtingPhotoPosts = async function filtingPhotoPosts() {
    resetPosts();
    if (!await showPhotoPosts(0, 8, filterConfig, true)) {
      const error = document.getElementById('modalWindowError');
      error.classList.remove('hidden');
      error.classList.add('visible');
      const message = error.getElementsByTagName('p')[0];
      message.textContent = 'Не найдено постов с заданными фильтрами';
    }
  };

  const logIn = function logIn() {
    const modalWindow = document.getElementById('modalWindowSingIn');
    const inputLogin = document.getElementsByName('login')[0];
    const inputPassword = document.getElementsByName('password')[0];
    user = inputLogin.value;
    inputLogin.value = '';
    inputPassword.value = '';
    const buttonSignOut = document.getElementsByClassName('headerSingInOut')[0];
    buttonSignOut.remove();
    showElementsForAuthUser();
    modalWindow.classList.remove('visible');
    modalWindow.classList.add('hidden');
  };

  const invalidLogIn = function invalidLogIn() {
    const inputLogin = document.getElementsByName('login')[0];
    const inputPassword = document.getElementsByName('password')[0];
    inputLogin.value = 'Неверный логин или пароль';
    inputPassword.value = '';
  };

  const checkSuccess = function checkSuccess() {
    const window = document.getElementById('modalWindowAddEditPhotoPost');
    const modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
    const drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];

    const upLoadIcon = drugDrop.getElementsByClassName('fas')[0];
    upLoadIcon.className = 'fas fa-check';
    upLoadIcon.style.color = '#0f0';

    const label = drugDrop.getElementsByClassName('chous')[0];
    label.textContent = 'Фото загружено';
  };

  const checkInvalid = function checkInvalid() {
    const window = document.getElementById('modalWindowAddEditPhotoPost');
    const modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
    const drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];

    const upLoadIcon = drugDrop.getElementsByClassName('fas')[0];
    upLoadIcon.className = 'fas fa-exclamation-circle';
    upLoadIcon.style.color = '#f00';

    const label = drugDrop.getElementsByClassName('chous')[0];
    label.textContent = 'Ошибка';

    const submitForm = document.getElementsByName('submitPost')[0];
    document.getElementsByName('addDescription')[0].value = '';
    document.getElementsByName('addHashtags')[0].value = [];
    submitForm.value = '';

    const inputFile = document.getElementsByName('upPhoto')[0];
    inputFile.value = null;
  };

  const resetFormAddPhoto = function resetFormAddPhoto() {
    const window = document.getElementById('modalWindowAddEditPhotoPost');
    const modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
    const drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];

    const upLoadIcon = drugDrop.getElementsByClassName('fas')[0];
    upLoadIcon.className = 'fas fa-upload';
    upLoadIcon.style.color = '#474143';

    const label = drugDrop.getElementsByClassName('chous')[0];
    label.textContent = 'Перетащите фото для загрузки';

    const submitForm = document.getElementsByName('submitPost')[0];
    document.getElementsByName('addDescription')[0].value = '';
    document.getElementsByName('addHashtags')[0].value = [];
    submitForm.value = '';
    document.getElementsByName('publishPost')[0].textContent = 'Опубликовать';

    const inputFile = document.getElementsByName('upPhoto')[0];
    inputFile.value = null;
  };

  const showModalRemovePost = function showModalRemovePost() {
    const modalWindow = document.getElementById('modalWindowConfirmDelete');
    modalWindow.classList.remove('hidden');
    modalWindow.classList.add('visible');
  };

  const showModalSingIn = function showModalSingIn() {
    const modalWindow = document.getElementById('modalWindowSingIn');
    modalWindow.classList.remove('hidden');
    modalWindow.classList.add('visible');
  };

  const logOut = function logOut() {
    const author = document.getElementsByClassName('headerUserName')[0];
    author.remove();

    const buttonAddPhoto = document.getElementsByClassName('headerAddFoto')[0];
    buttonAddPhoto.remove();

    const buttonSignOut = document.getElementsByClassName('headerSingInOut')[0];
    buttonSignOut.remove();

    showButtonSingIn();

    const posts = document.getElementsByClassName('postBox');
    [].forEach.call(posts, (item) => {
      const like = item.getElementsByClassName('fa-heart')[0];
      like.className = 'fas fa-heart unlike';

      const edit = item.getElementsByClassName('fa-edit')[0];
      const trash = item.getElementsByClassName('fa-trash-alt')[0];
      if (edit !== undefined || trash !== undefined) {
        edit.remove();
        trash.remove();
      }
    });
  };

  const showModalAddEditPost = function showModalAddEditPost() {
    const window = document.getElementById('modalWindowAddEditPhotoPost');
    window.classList.remove('hidden');
    window.classList.add('visible');

    const modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
    modalWindow.getElementsByTagName('h2')[0].textContent = user;
    modalWindow.getElementsByTagName('h4')[0].textContent = `Дата: ${utilities.formatDate(new Date())}`;
  };

  const showModalEdit = function showModalEdit(post) {
    const description = post.getElementsByClassName('commentBox')[0].textContent;
    const hashtags = post.getElementsByClassName('hashtagsBox')[0].textContent;
    const window = document.getElementById('modalWindowAddEditPhotoPost');
    window.classList.remove('hidden');
    window.classList.add('visible');
    const modalWindow = window.childNodes[1];
    document.getElementsByName('addDescription')[0].value = description;
    document.getElementsByName('addHashtags')[0].value = hashtags;
    document.getElementsByName('publishPost')[0].textContent = 'Изменить';
    modalWindow.getElementsByTagName('h2')[0].textContent = user;
    modalWindow.getElementsByTagName('h4')[0].textContent = `Дата: ${utilities.formatDate(new Date())}`;

    const drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];
    const label = drugDrop.getElementsByClassName('chous')[0];
    label.textContent = 'Загрузить другое фото';
    document.getElementsByName('submitPost')[0].value = post.getElementsByClassName('foto')[0].src;
  };

  return {
    domShowPhotoPosts,
    addPhotoPost,
    removePhotoPost,
    editPhotoPost,
    showElementsForAuthUser,
    showFilterUsers,
    showFilterHashtags,
    likePost,
    unLikePost,
    showButtonSingIn,
    resetPosts,
    filtingPhotoPosts,
    logIn,
    checkSuccess,
    checkInvalid,
    resetFormAddPhoto,
    showModalRemovePost,
    showModalSingIn,
    logOut,
    showModalAddEditPost,
    showModalEdit,
    invalidLogIn
  };
}());
