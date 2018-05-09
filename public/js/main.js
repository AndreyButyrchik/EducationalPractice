let user = 'Галя Печка';

let filterConfig = {createdAt: {}, author: '', hashtags: []};

async function showPhotoPosts(skip, top, filterConfig, insertBefore) {
    let postsArray;
    try {
        postsArray = await requestFunctions.getPhotoPosts(skip, top, filterConfig);
    } catch (err) {
        console.log(`Ooops ${err}`);
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
        console.log(`Ooops ${err}`);
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
        console.log(`Ooops ${err}`);
    }
    return false;
}

async function removePhotoPost(event) {
    let modalWindow = document.getElementById('modalWindowConfirmDelete');
    modalWindow.classList.remove('visible');
    modalWindow.classList.add('hidden');
    let id = event.target.value;
    try {
        if (await requestFunctions.removePhotoPost(id)) {
            domFunc.removePhotoPost(id);
        }
    } catch (err) {
        console.log(`Ooops ${err}`);
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

async function likePost(event) {
    try {
        if (user !== null && event.target.classList.contains('fa-heart')) {
            await requestFunctions.likePhotoPost(this.id, user) ? domFunc.likePost(this.id) : domFunc.unLikePost(this.id);
        }
    } catch (err) {
        console.log(`Ooops ${err}`);
    }
}

requestFunctions.getNewPosts();

showPhotoPosts(0, 8, filterConfig, true);

showElementsForUser();
