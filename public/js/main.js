let user = 'Галя Печка';

let filterConfig = {createdAt: {}, author: '', hashtags: []};

function showPhotoPosts(skip, top, filterConfig, insertBefore) {
    return requestFunctions.getPhotoPosts(skip, top, filterConfig)
        .then(
            postsArray => {
                if (typeof postsArray === 'object') {
                    let rem;
                    while(true) {
                        rem = 0;
                        for (let i = 0; i < postsArray.length; i++) {
                            if (postsArray[i].removed === true) {
                                postsArray.splice(i, 1);
                                rem++;
                            }
                        }
                        if (rem === 0) {
                            break;
                        }
                        let additionalPosts = requestFunctions.getPhotoPosts(top, rem, filterConfig);
                        if(additionalPosts) {
                            additionalPosts.forEach(function (post) {
                                postsArray.push(post);
                            });
                        }
                        top += rem;
                    }
                    domFunc.showPhotoPosts(postsArray, insertBefore);
                    return true;
                }
                return false;
            }
        );
}

function addPhotoPost(PhotoPost, insertBefore) {
    return requestFunctions.addPhotoPost(PhotoPost)
        .then(
            post => {
                if (post) {
                    domFunc.addPhotoPost(PhotoPost, insertBefore);
                    return true;
                }
                return false;
            }
        );
}

function editPhotoPost(id, photoPost) {
    return requestFunctions.editPhotoPost(id,photoPost)
        .then(
            edit => {
                if (edit) {
                    domFunc.editPhotoPost(id, photoPost);
                    return true;
                }
                return false;
            }
        );
}

function removePhotoPost(event) {
    let modalWindow = document.getElementById('modalWindowConfirmDelete');
    modalWindow.style.display = 'none';
    let id = event.target.value;
    requestFunctions.removePhotoPost(id)
        .then(
            remove => {
                if (remove) {
                    domFunc.removePhotoPost(id);
                }
                return false;
            }
        );
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
        requestFunctions.likePhotoPost(this.id)
            .then(
                like => {
                    like ? domFunc.likePost(this.id) : domFunc.unLikePost(this.id);
                }
            );
    }
}

showPhotoPosts(0, 8, filterConfig, true);

showElementsForUser();