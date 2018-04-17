let requestFunctions = (function () {

    let getPhotoPost = function (id) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `/getPost/?id=${id}`, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }

                resolve(JSON.parse(xhr.responseText, parseDate));
            };

            xhr.send();
        });
    };

    let getPhotoPosts = function (skip, top, filterConfig) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `/getPosts/?skip=${skip}&top=${top}`, true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }

                resolve(JSON.parse(xhr.responseText, parseDate));
            };

            xhr.send(JSON.stringify(filterConfig));
        });
    };

    let addPhotoPost = function (photoPost) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/addPost', true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }
                resolve(true);
            };

            xhr.send(JSON.stringify(photoPost));
        });
    };

    let removePhotoPost = function (id) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', `/delete/?id=${id}`, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }
                resolve(true);
            };

            xhr.send();
        });
    };

    let editPhotoPost = function (id, photoPost) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', `/editPost/?id=${id}`, true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }
                resolve(true);
            };

            xhr.send(JSON.stringify(photoPost));
        });
    };

    let likePhotoPost = function (id) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `/likePost/?id=${id}&user=${user}`, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }
                resolve(xhr.responseText === "true" ? true : false);
            };

            xhr.send();
        });
    };

    let getUniqueNames = function () {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/getUniqueNames', true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }
                resolve(JSON.parse(xhr.responseText));
            };

            xhr.send();
        });
    };

    let getUniqueHashtags = function () {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/getUniqueHashtags', true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    reject(new Error('Invalid query'));
                }
                resolve(JSON.parse(xhr.responseText));
            };

            xhr.send();
        });
    };

    let getNewPosts = function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/getNewPost', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;

            if (xhr.status !== 200) {
                console.log('Invalid query');
            }
            domFunc.addPhotoPost(JSON.parse(xhr.responseText, parseDate), true);
            getNewPosts();

        };

        xhr.send();
    };

    function parseDate(key, value) {
        if (key === 'createdAt' && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    }

    return {
        getPhotoPost,
        removePhotoPost,
        addPhotoPost,
        editPhotoPost,
        getPhotoPosts,
        likePhotoPost,
        getUniqueNames,
        getUniqueHashtags,
        getNewPosts
    }
})();

requestFunctions.getNewPosts();