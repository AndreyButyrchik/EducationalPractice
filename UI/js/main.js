let user = 'Галя Печка';

let filterConfig = {createdAt: {}, author: '', hashtags: []};

function showPhotoPosts(skip, top, filterConfig, insertBefore) {
    let postsArray = dataFunc.getPhotoPosts(skip, top, filterConfig);
    if (typeof postsArray === 'object') {
        domFunc.showPhotoPosts(postsArray, insertBefore);
        return true;
    }
    return false;
}

function addPhotoPost(PhotoPost, insertBefore) {
    if (dataFunc.addPhotoPost(PhotoPost)) {
        domFunc.addPhotoPost(PhotoPost, insertBefore);
        return true;
    }
    return false;
}

function editPhotoPost(id, photoPost) {
    if (dataFunc.editPhotoPost(id,photoPost)) {
        domFunc.editPhotoPost(id, photoPost);
        return true;
    }
    return false;
}

function removePhotoPost(event) {
    let modalWindow = document.getElementById('modalWindowConfirmDelete');
    modalWindow.style.display = 'none';
    let id = event.target.value;
    if (dataFunc.removePhotoPost(id)) {
        domFunc.removePhotoPost(id);
    }
    return false;
}

function showElementsForUser() {
    if (user !== null) {
        domFunc.showElementsForAuthUser();
    }
    else {
        domFunc.showButtonSingIn();
    }
    domFunc.showFilterUsers();
    domFunc.showFilterHashtags();
}

function likePost(event) {
    if (user !== null && event.target.classList.contains('fa-heart')) {
        if (dataFunc.likePhotoPost(this.id)) {
            domFunc.likePost(this.id);
        }
        else {
            domFunc.unLikePost(this.id);
        }
    }
}

showPhotoPosts(0, 8, filterConfig, true);

showElementsForUser();