let domFunc = (function () {

    function showUserName() {
        let header = document.getElementsByTagName('header')[0];
        let headerUserName = document.createElement('div');
        let userName = document.createElement('h1');
        headerUserName.className = 'headerUserName';
        userName.textContent = user;
        headerUserName.appendChild(userName);
        header.insertBefore(headerUserName, header.childNodes[0]);
    }

    function showButtonAddFoto() {
        let header = document.getElementsByTagName('header')[0];
        let headerAddFoto = document.createElement('div');
        headerAddFoto.className = 'headerAddFoto';
        let addFotoImg = document.createElement('i');
        addFotoImg.className = 'fas fa-plus-circle';
        addFotoImg.style.cursor = 'pointer';
        addFotoImg.onclick = events.eShowModalAddPost;
        headerAddFoto.appendChild(addFotoImg);
        header.appendChild(headerAddFoto);
    }

    function showButtonSignIn() {
        let header = document.getElementsByTagName('header')[0];
        let headerSingIn = document.createElement('div');
        headerSingIn.className = 'headerSingInOut';
        let singInImg = document.createElement('i');
        singInImg.className = 'fas fa-sign-out-alt';
        singInImg.onclick = events.logOut;
        singInImg.style.cursor = 'pointer';
        headerSingIn.appendChild(singInImg);
        header.appendChild(headerSingIn);
    }

    function showButtonEditPost(item) {
        let commentBox = item.getElementsByClassName('commentBox')[0];
        let editImage = document.createElement('i');
        editImage.className = 'fas fa-edit';
        editImage.onclick = events.eShowModalEditPost;
        item.insertBefore(editImage, commentBox);
    }

    function showButtonTrash(item) {
        let commentBox = item.getElementsByClassName('commentBox')[0];
        let trashImage = document.createElement('i');
        trashImage.className = 'fas fa-trash-alt';
        trashImage.style.cursor = 'pointer';
        trashImage.onclick = events.showModalRemovePost;
        item.insertBefore(trashImage, commentBox);
    }

    let showPhotoPosts = function (postsArray, insertBefore) {
        if (insertBefore) {
            postsArray.reverse();
        }
        postsArray.forEach(function (item) {
            addPhotoPost(item, insertBefore);
        });
    };

    let addPhotoPost = function (photoPost, insertBefore) {
        let main = document.getElementsByTagName('main')[0];
        let template = document.getElementById('templatePost');
        let newPost = template.content.cloneNode(true).childNodes[1];
        let heart = newPost.getElementsByClassName('fa-heart')[0];
        events.eLikePost(newPost);
        newPost.id = photoPost.id;
        newPost.childNodes[1].textContent = photoPost.author;
        newPost.childNodes[3].firstChild.src = photoPost.photoLink;
        newPost.childNodes[7].firstChild.textContent = photoPost.descriprion;
        newPost.childNodes[9].firstChild.textContent = photoPost.hashtags.join(' ');
        newPost.childNodes[11].firstChild.textContent = 'Фото было опубликовано ' + formatDate(photoPost.createdAt);
        if (user === photoPost.author) {
            showButtonEditPost(newPost);
            showButtonTrash(newPost);
        }
        if (photoPost.likes.indexOf(user) !== -1) {
            heart.className = 'fas fa-heart like';
        }
        if (insertBefore) {
            main.insertBefore(newPost, main.childNodes[3]);
        }
        else {
            main.insertBefore(newPost, main.childNodes[main.childNodes.length - 2]);
        }
    };

    let removePhotoPost = function (id) {
        let removePost = document.getElementById(id);
        removePost.remove();
    };

    let editPhotoPost = function (id, photoPost) {
        let editPost = document.getElementById(id);
        if (photoPost.descriprion &&
            photoPost.descriprion.length < 200 &&
            photoPost.descriprion.length !== 0) {
            let descriptionBox = editPost.getElementsByClassName('commentBox');
            let description = descriptionBox[0].firstChild;
            description.textContent = photoPost.descriprion;
        }
        if (photoPost.photoLink &&
            photoPost.photoLink.length !== 0) {
            let photoBox = editPost.getElementsByClassName('fotoSpace');
            let photo = photoBox[0].firstChild;
            photo.src = photoPost.photoLink;
        }
        if (photoPost.hashtags &&
            photoPost.hashtags.length !== 0) {
            let hashtagsBox = editPost.getElementsByClassName('hashtagsBox');
            let hashtags = hashtagsBox[0].firstChild;
            hashtags.textContent = photoPost.hashtags.join(' ');
        }
    };

    let showElementsForAuthUser = function () {
        showUserName();
        showButtonAddFoto();
        showButtonSignIn();

        let buttonSingIn = document.getElementsByClassName('fa-sign-in-alt')[0];
        if (buttonSingIn !== undefined) {
            buttonSingIn.remove();
        }

        let posts = document.getElementsByClassName('postBox');
        [].forEach.call(posts, async function (item) {
            let author = item.childNodes[1].textContent;
            if (author === user && (item.getElementsByClassName('fa-trash-alt')[0]) === undefined) {
                showButtonEditPost(item);
                showButtonTrash(item);
            }
            let id = item.id;

            let dataPost = await requestFunctions.getPhotoPost(id);
            if (dataPost.likes.indexOf(user) !== -1) {
                let heart = item.getElementsByClassName('fa-heart')[0];
                heart.className = 'fas fa-heart like';
            }

        });
    };

    let showFilterUsers = async function () {
        let dataUsers = document.getElementById('userNames');

        let uniqueNames = await requestFunctions.getUniqueNames();
        uniqueNames.forEach(function (item) {
            let userName = document.createElement('option');
            userName.value = item;
            dataUsers.appendChild(userName);
        })
    };

    let showFilterHashtags = async function () {
        let dataUsers = document.getElementById('hashtags');
        let uniqueHashtags = await requestFunctions.getUniqueHashtags();

        uniqueHashtags.forEach(function (item) {
            let hashtag = document.createElement('option');
            hashtag.value = item;
            dataUsers.appendChild(hashtag);
        })
    };

    let likePost = function (id) {
        let post = document.getElementById(id);
        let heart = post.getElementsByClassName('fa-heart')[0];
        heart.className = 'fas fa-heart like';
    };

    let unLikePost = function (id) {
        let post = document.getElementById(id);
        let heart = post.getElementsByClassName('fa-heart')[0];
        heart.className = 'fas fa-heart unlike';
    };

    let showButtonSingIn = function () {
        let header = document.getElementsByTagName('header');
        let headerSingOut = document.createElement('div');
        headerSingOut.className = 'headerSingInOut';
        let singOutImg = document.createElement('i');
        singOutImg.className = 'fas fa-sign-in-alt';
        singOutImg.style.cursor = 'pointer';
        singOutImg.addEventListener('click', events.eSingIn);
        headerSingOut.appendChild(singOutImg);
        header[0].appendChild(headerSingOut);
        let portalName = document.querySelector('.headerPortalName');
        portalName.style.width = '90vw';
    };

    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) {
            dd = `0${dd}`;
        }

        let mm = date.getMonth() + 1;
        if (mm < 10) {
            mm = `0${mm}`;
        }

        let yy = date.getFullYear();
        if (yy < 10) {
            yy = `0${yy}`;
        }

        return dd + '.' + mm + '.' + yy;
    }

    return {
        showPhotoPosts,
        addPhotoPost,
        removePhotoPost,
        editPhotoPost,
        showElementsForAuthUser,
        showFilterUsers,
        showFilterHashtags,
        likePost,
        unLikePost,
        showButtonSingIn
    }

})();