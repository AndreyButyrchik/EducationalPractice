let requestFunctions = (function () {

    let getPhotoPost = function (id) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/getPost/?id=${id}`, false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }

        return JSON.parse(xhr.responseText, parseDate);
    };

    let getPhotoPosts = function (skip, top, filterConfig) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `/getPosts/?skip=${skip}&top=${top}`, false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(filterConfig));

        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }

        return JSON.parse(xhr.responseText, parseDate);
    };

    let addPhotoPost = function (photoPost) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/addPost', false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));
        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }
        return true;
    };

    let removePhotoPost = function (id) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/delete/?id=${id}`, false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }
        return true;
    };

    let editPhotoPost = function (id, photoPost) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `/editPost/?id=${id}`, false);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(photoPost));
        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }
        return true;
    };

    let likePhotoPost = function (id) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/likePost/?id=${id}&user=${user}`, false);
        xhr.send();
        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }

        return xhr.responseText === "true" ? true : false;
    };

    let getUniqueNames = function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getUniqueNames', false);
        xhr.send();

        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }

        return JSON.parse(xhr.responseText);
    };

    let getUniqueHashtags = function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getUniqueHashtags', false);
        xhr.send();

        if (xhr.status !== 200) {
            console.log('error: ' + (xhr.status ? xhr.statusText : 'invalid query'));
            return false;
        }

        return JSON.parse(xhr.responseText);
    };

    function parseDate (key, value) {
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
        getUniqueHashtags
    }
})();