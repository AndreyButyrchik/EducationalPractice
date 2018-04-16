const fs = require('fs');

let dataFunctions = (function () {

    function getPhotoPost(id) {
        if (typeof id !== "string" ||
            Number(id) < 1) {
            return false;
        }
        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let posts = JSON.parse(jsonPosts, parseDate);
        let sourcePost = posts.find((post) => id === post.id);
        if (sourcePost && (sourcePost.removed === false)) {
            return JSON.stringify(sourcePost);
        }
        return false;
    }

    function addPhotoPost(photoPost) {
        photoPost.id = getUniqueId();
        if (validatePhotoPost(photoPost)) {
            let jsonPosts = fs.readFileSync('./data/photoPosts.json');
            let posts = JSON.parse(jsonPosts, parseDate);
            posts.push(photoPost);
            fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
            return true;
        }
        return false;
    }

    function getPhotoPosts(skip, top, filterConfig) {
        if (validateNumber(skip)) {
            skip = 0;
        }


        if (validateNumber(top)) {
            top = 8;
        }

        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let postsArray = JSON.parse(jsonPosts, parseDate);

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

        if (filtPhotoPosts.length !== 0) {
            return JSON.stringify(filtPhotoPosts.slice(skip, skip + top));
        }
        return false;
    }

    function removePhotoPost(id) {
        if (typeof  id === "undefined" ||
            typeof id !== "string" ||
            Number(id) < 1) {
            return false;
        }
        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let posts = JSON.parse(jsonPosts, parseDate);
        let removePost = posts.find((post) => id === post.id);
        if (removePost !== undefined) {
            removePost.removed = true;
            fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
            return true;
        }
        return false;
    }

    function editPost(id, photoPost) {
        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let posts = JSON.parse(jsonPosts, parseDate);
        let postIsEdit = false;
        let editPost = posts.find((post) => id === post.id);
        if (validatePhotoPost(editPost)) {
            if (photoPost.descriprion &&
                photoPost.descriprion.length < 200 &&
                photoPost.descriprion.length !== 0) {
                editPost.descriprion = photoPost.descriprion;
                postIsEdit = true;
            }
            if (photoPost.photoLink &&
                photoPost.photoLink.length !== 0) {
                editPost.photoLink = photoPost.photoLink;
                postIsEdit = true;
            }
            if (photoPost.hashtags &&
                photoPost.hashtags.length !== 0) {
                editPost.hashtags = photoPost.hashtags;
                postIsEdit = true;
            }
            if (photoPost.likes &&
                editPost.likes !== photoPost.likes) {
                editPost.likes = photoPost.likes
            }
            fs.writeFileSync('./data/photoPosts.json', JSON.stringify(posts));
            return postIsEdit;
        }
        return false;
    }

    function likePost(id, user) {
        let jsonPost = getPhotoPost(id);
        if (jsonPost) {
            let post = JSON.parse(jsonPost, parseDate);
            let idxUser = post.likes.indexOf(user);
            if (idxUser === -1) {
                post.likes.push(user);
                editPost(id, post);
                return 1;
            }
            else {
                post.likes.splice(idxUser, 1);
                editPost(id, post);
                return 2;
            }
        }
        return false;
    }

    function getUniqueNames() {
        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let posts = JSON.parse(jsonPosts, parseDate);

        let uniqueNames = new Set();
        posts.forEach(function (item) {
            uniqueNames.add(item.author);
        });
        if (uniqueNames.length !== 0) {
            return JSON.stringify(Array.from(uniqueNames));
        }
        return false;
    }

    function getUniqueHashtags() {
        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let posts = JSON.parse(jsonPosts, parseDate);

        let uniqueHashtags = new Set();
        posts.forEach(function (item) {
            if (!item.removed) {
                item.hashtags.forEach(function (hashtag) {
                    uniqueHashtags.add(hashtag);
                });
            }
        });
        if (uniqueHashtags.length !== 0) {
            return JSON.stringify(Array.from(uniqueHashtags));
        }
        return false;
    }

    function validateNumber(numb) {
        return typeof numb === "undefined" ||
            typeof numb !== "number" ||
            numb < 0 ||
            (numb ^ 0) !== numb;
    }

    function validatePhotoPost(photoPost) {
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
    }

    function parseDate(key, value) {
        if (key === 'createdAt' && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    }

    function getUniqueId() {
        let jsonPosts = fs.readFileSync('./data/photoPosts.json');
        let postsArray = JSON.parse(jsonPosts, parseDate);
        let id = 0;
        postsArray.forEach(function (post) {
            id = Math.max(parseInt(post.id), id);
        });
        id = id + 1;
        return id.toString();
    }

    return {
        getPhotoPost,
        removePhotoPost,
        addPhotoPost,
        editPost,
        getPhotoPosts,
        getUniqueNames,
        getUniqueHashtags,
        likePost
    }
})();

module.exports = dataFunctions;