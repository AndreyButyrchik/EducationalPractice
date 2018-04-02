let dataFunc = (function () {
    let formatDate = function (date) {

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
    };

    let getPhotoPost = function (id) {
        if (typeof id !== "string" ||
            Number(id) < 1) {
            return false;
        }

        let xhr = new XMLHttpRequest();
        let requestId = '/getPost/' + id;
        xhr.open('GET', requestId, false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log('ошибка: ' + (xhr.status ? xhr.statusText : 'запрос не удался'));
            return false;
        }

        return JSON.parse(xhr.responseText, function (key, value) {
            if (key === 'createdAt') {
                return new Date(value);
            }
            return value;
        });
    };

    let validatePhotoPost = function (photoPost) {
        if (typeof photoPost === "undefined" ||
            typeof photoPost.id !== "string" ||
            typeof photoPost.descriprion !== "string" ||
            typeof photoPost.createdAt !== "object" ||
            typeof photoPost.author !== "string" ||
            typeof photoPost.photoLink !== "string" ||
            typeof photoPost.hashtags !== "object" ||
            typeof  photoPost.likes !== "object") {
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
        return photoPost.hashtags.every(function (item) {
            return (item.charAt(0) === "#" && item.length > 1);
        });
    };

    let addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)) {
            let jsonPost = JSON.stringify(photoPost);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/addPost', false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(jsonPost);
            if (xhr.status !== 200) {
                console.log('ошибка: ' + (xhr.status ? xhr.statusText : 'запрос не удался'));
                return false;
            }
            return true;
        }
        return false;
    };

    let removePhotoPost = function (id) {
        if (typeof  id === "undefined" ||
            typeof id !== "string" ||
            Number(id) < 1) {
            return false;
        }
        let jsonPost = localStorage.getItem(id);
        let post = JSON.parse(jsonPost);
        post.removed = true;
        localStorage.removeItem(id);
        return true;
    };

    let editPhotoPost = function (id, photoPost) {
        let sourcePhotoPost = getPhotoPost(id);
        if (sourcePhotoPost) {
            if (validatePhotoPost(sourcePhotoPost)) {
                let insertBefore = false;
                if (photoPost.descriprion &&
                    photoPost.descriprion.length < 200 &&
                    photoPost.descriprion.length !== 0) {
                    sourcePhotoPost.descriprion = photoPost.descriprion;
                    insertBefore = true;
                }
                if (photoPost.photoLink &&
                    photoPost.photoLink.length !== 0) {
                    sourcePhotoPost.photoLink = photoPost.photoLink;
                    insertBefore = true;
                }
                if (photoPost.hashtags &&
                    photoPost.hashtags.length !== 0) {
                    sourcePhotoPost.hashtags = photoPost.hashtags;
                    insertBefore = true;
                }
                if (insertBefore) {
                    localStorage.setItem(sourcePhotoPost.id, JSON.stringify(sourcePhotoPost));
                    return true;
                }
            }
        }
        return false;
    };

    let validateNumber = function (numb) {
        return typeof numb === "undefined" ||
            typeof numb !== "number" ||
            numb < 0 ||
            (numb ^ 0) !== numb;
    };

    let getPhotoPosts = function (skip, top, filterConfig) {
        if (validateNumber(skip)) {
            skip = 0;
        }


        if (validateNumber(top)) {
            top = 10;
        }

        for (let i = skip; i < Math.min(skip + top, localStorage.length); i++) {
            let key = localStorage.key(i);
            let post = getPhotoPost(key);
            if (!validatePhotoPost(post)) {
                return false;
            }
        }

        let postsArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            let id = localStorage.key(i);
            let post = getPhotoPost(id);
            postsArray.push(post);
        }

        let filtPhotoPosts = postsArray.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });


        if (typeof filterConfig === "object") {
            if (filterConfig.createdAt &&
                typeof filterConfig.createdAt === "object" &&
                filterConfig.createdAt instanceof Date) {
                filtPhotoPosts = filtPhotoPosts.filter(function (item) {
                    return item.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                        item.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                        item.createdAt.getDate() === filterConfig.createdAt.getDate();
                });
            }


            if (filterConfig.author &&
                typeof filterConfig.author === "string" &&
                filterConfig.author.length !== 0) {
                filtPhotoPosts = filtPhotoPosts.filter(function (item) {
                    return item.author === filterConfig.author;
                });
            }


            if (filterConfig.hashtags &&
                typeof filterConfig.hashtags === "object" &&
                filterConfig.hashtags instanceof Array) {
                filtPhotoPosts = filtPhotoPosts.filter(function (item) {
                    let correctHashtags = true;
                    for (let i = 0; i < filterConfig.hashtags.length; i++) {
                        if (item.hashtags.indexOf(filterConfig.hashtags[i]) === -1) {
                            correctHashtags = false;
                        }
                    }
                    return correctHashtags;
                });
            }
        }


        let buttonGetMoreFotoPosts = document.getElementsByClassName('moreFotoButton')[0];
        if ((skip + top) > filtPhotoPosts.length) {
            buttonGetMoreFotoPosts.style.display = 'none';
        }
        else {
            buttonGetMoreFotoPosts.style.display = 'inline-block';
        }

        if (filtPhotoPosts.length !== 0) {
            return filtPhotoPosts.slice(skip, skip + top);
        }
        return false;
    };

    let likePhotoPost = function (id) {
        let post = getPhotoPost(id);
        if (post && validatePhotoPost(post)) {
            let idxUser = post.likes.indexOf(user);
            if (idxUser === -1) {
                post.likes.push(user);
                localStorage.setItem(post.id, JSON.stringify(post));
                return true
            }
            post.likes.splice(idxUser, 1);
            localStorage.setItem(post.id, JSON.stringify(post));
        }
        return false;
    };

    return {
        getPhotoPost,
        validatePhotoPost,
        removePhotoPost,
        addPhotoPost,
        editPhotoPost,
        getPhotoPosts,
        likePhotoPost,
        formatDate
    }
})();