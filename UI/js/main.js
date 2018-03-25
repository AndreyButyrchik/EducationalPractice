let user = 'Галя Печка';

let filterConfig = {createdAt: {}, author: '', hashtags: []};

let photoPostsArray = [
    {
        id: '1',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-21T23:00:00'),
        author: 'Вася Сиплый',
        photoLink: 'http://www.kino-teatr.ru/acter/album/3215/450605.jpg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '2',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-03-01T23:00:00'),
        author: 'Дима Зевс',
        photoLink: 'https://pp.userapi.com/c305713/u11158447/154446725/x_60f14c4f.jpg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '3',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-12T23:00:00'),
        author: 'Вано Питон',
        photoLink: 'https://forum.anabolicshops.com/attachments/60185/',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '4',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-09T23:00:00'),
        author: 'Ромчик Гвоздь',
        photoLink: 'https://i08.fotocdn.net/s11/154/public_pin_m/474/2311969177.jpg',
        hashtags: ['#cool', '#positive', '#intergalactic'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '5',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'Катя Пляжная',
        photoLink: 'http://1.bp.blogspot.com/--BZ64SXerLA/U7Q4sosowBI/AAAAAAAADqs/K7poh-Rblq0/s1600/103350358_3256587_tynika0.jpg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '6',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-20T23:00:00'),
        author: 'Фил Ночной',
        photoLink: 'http://www.gipsyteam.ru/upload/Contentimage/default/1/4/9/14993.jpg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '7',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-18T23:00:00'),
        author: 'Зоя Кожаный-Затылок',
        photoLink: 'http://www.medpillmart.com/blog/wp-content/uploads/2016/03/healthy-life-with-exercise.jpg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '8',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Димон Кудрявый',
        photoLink: 'https://pp.userapi.com/c840226/v840226013/27508/MJjzdUOsaNQ.jpg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '9',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-03-02T23:00:00'),
        author: 'Луи Кирпич',
        photoLink: 'https://s79369.cdn.ngenix.net/media/photo/original/20170515/5bf6a2b3b7b906ebd3e023192883b0f3.jpg',
        hashtags: ['#cool', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '10',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-01T23:00:00'),
        author: 'Павлик Подгубный',
        photoLink: 'https://pp.userapi.com/c638326/v638326670/40cb7/Io79qfHCZnU.jpg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '11',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-02T23:00:00'),
        author: 'Танюха Мазь',
        photoLink: 'https://scontent-arn2-1.cdninstagram.com/t51.2885-15/e15/1170465_571301496276287_1328633538_n.jpg?ig_cache_key=NTg0NjA5MTk5MDA1NTgzNjUx.2',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '12',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-13T23:00:00'),
        author: 'Ислам Чех',
        photoLink: 'http://today.kz/static/uploads/5311aa79-96b1-4c5a-960f-37a1935c398c.jpeg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '13',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-11T23:00:00'),
        author: 'Ульянка Куст',
        photoLink: 'https://img-fotki.yandex.ru/get/202385/414521066.5/0_180fed_dc694d7f_orig.jpg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '14',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-12T23:00:00'),
        author: 'Леха Краснопёрый',
        photoLink: 'http://lesohot.ru/upload/blogs/f92f2b517a886d5de80a4451ef38b218.jpg',
        hashtags: ['#cool', '#positive'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '15',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-22T23:00:00'),
        author: 'Шурик Веселый',
        photoLink: 'https://союзженскихсил.рф/upload/resize_cache/main/b6d/800_800_1/b6d97c5b46ccc547e50b7210dc37c645.jpg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '16',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-29T23:00:00'),
        author: 'Даня Фазан',
        photoLink: 'http://cs7004.vk.me/v7004018/1da5a/lwbInpNmCAM.jpg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic', '#yeah'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '17',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-11T23:00:00'),
        author: 'Гена Орешек',
        photoLink: 'https://news.pn/photo/3786ecbdc5eaa3fc92e9569a4bc5a8ec.i1200x900x687.jpeg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '18',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-03-01T23:00:00'),
        author: 'Галя Печка',
        photoLink: 'https://s10.stc.all.kpcdn.net/share/i/4/1174690/wx1080.jpg',
        hashtags: ['#cool', '#smile', '#positive'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    },
    {
        id: '19',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-01-18T23:00:00'),
        author: 'Саша Соска',
        photoLink: 'http://blog.nedbright.com/wp-content/uploads/2015/10/1380443087_953250986.jpg',
        hashtags: ['#cool', '#positive', '#smile'],
        likes: ['Рома Торпеда', 'Галя Печка', 'Гена Орешек'],
        removed: false
    },
    {
        id: '20',
        descriprion: 'Smile, it is the key that fits the lock of everybody\'s heart.',
        createdAt: new Date('2018-02-27T23:00:00'),
        author: 'Рома Торпеда',
        photoLink: 'https://i.ytimg.com/vi/7ApWJhEQaco/maxresdefault.jpg',
        hashtags: ['#cool', '#smile', '#positive', '#intergalactic'],
        likes: ['Дима Зевс', 'Зоя Кожаный-Затылок', 'Луи Кирпич', 'Шурик Веселый'],
        removed: false
    }
];

let dataFunc = (function () {

    let getPhotoPost = function (id) {
        if (typeof id !== "string" ||
            Number(id) < 1) {
            return false;
        }
        for (let i = 0; i < photoPostsArray.length; i++) {
            if (photoPostsArray[i].id === id) {
                return photoPostsArray[i];
            }
        }
        return false;
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
        for (let i = 0; i < photoPostsArray.length; i++) {
            if ((photoPostsArray[i].id === photoPost.id) &&
                (photoPost !== photoPostsArray[i])) {
                return false;
            }
        }
        return photoPost.hashtags.every(function (item) {
            return item.charAt(0) === "#";
        });
    };

    let addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPostsArray.push(photoPost);
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
        for (let i = 0; i < photoPostsArray.length; i++) {
            if (photoPostsArray[i].id === id) {
                photoPostsArray[i].removed = true;
                photoPostsArray.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    let editPhotoPost = function (id, photoPost) {
        let sourcePhotoPost = getPhotoPost(id);
        if (sourcePhotoPost) {
            if (validatePhotoPost(sourcePhotoPost)) {
                let flag = false;
                if (photoPost.descriprion &&
                    photoPost.descriprion.length < 200 &&
                    photoPost.descriprion.length !== 0) {
                    sourcePhotoPost.descriprion = photoPost.descriprion;
                    flag = true;
                }
                if (photoPost.photoLink &&
                    photoPost.photoLink.length !== 0) {
                    sourcePhotoPost.photoLink = photoPost.photoLink;
                    flag = true;
                }
                if (photoPost.hashtags &&
                    photoPost.hashtags.length !== 0) {
                    sourcePhotoPost.hashtags = photoPost.hashtags;
                    flag = true;
                }
                return flag;
            }
            else {
                return false;
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

        for (let i = skip; i < Math.min(skip + top, photoPostsArray.length); i++) {
            if (!validatePhotoPost(photoPostsArray[i])) {
                return false;
            }
        }


        let filtPhotoPosts = photoPostsArray.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });


        if (typeof  filterConfig === "object") {
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
                    let flag = true;
                    for (let i = 0; i < filterConfig.hashtags.length; i++) {
                        if (item.hashtags.indexOf(filterConfig.hashtags[i]) === -1) {
                            flag = false;
                        }
                    }
                    return flag;
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

        return filtPhotoPosts.slice(skip, skip + top);
    };

    let likePhotoPost = function (id) {
        let post = getPhotoPost(id);
        if (post && validatePhotoPost(post)) {
            let idxUser = post.likes.indexOf(user);
            if (idxUser === -1) {
                post.likes.push(user);
                return true
            }
            post.likes.splice(idxUser, 1);
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
        likePhotoPost
    }
})();

let domFunc = (function () {
    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

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
        let addFotoLink = document.createElement('a');
        addFotoLink.href = '#';
        let addFotoImg = document.createElement('i');
        addFotoImg.className = 'fas fa-plus-circle';
        addFotoLink.appendChild(addFotoImg);
        headerAddFoto.appendChild(addFotoLink);
        header.appendChild(headerAddFoto);
    }

    function showButtonSignIn() {
        let header = document.getElementsByTagName('header')[0];
        let headerSingIn = document.createElement('div');
        headerSingIn.className = 'headerSingInOut';
        let singInLink = document.createElement('a');
        singInLink.href = '#';
        let singInImg = document.createElement('i');
        singInImg.className = 'fas fa-sign-out-alt';
        singInLink.appendChild(singInImg);
        headerSingIn.appendChild(singInLink);
        header.appendChild(headerSingIn);
    }

    function showButtonEditPost(item) {
        let commentBox = item.getElementsByClassName('commentBox')[0];
        let editButton = document.createElement('a');
        let editImage = document.createElement('i');
        editImage.className = 'fas fa-edit';
        editButton.appendChild(editImage);
        item.insertBefore(editButton, commentBox);
    }

    function showButtonTrash(item) {
        events.eRemovePost(item);
        let commentBox = item.getElementsByClassName('commentBox')[0];
        let trashButton = document.createElement('a');
        let trashImage = document.createElement('i');
        trashImage.className = 'fas fa-trash-alt';
        trashButton.appendChild(trashImage);
        item.insertBefore(trashButton, commentBox);
    }

    let showPhotoPosts = function (postsArray) {
        postsArray.reverse();
        postsArray.forEach(function (item) {
            addPhotoPost(item);
        });
    };

    let addPhotoPost = function (photoPost) {
        let main = document.getElementsByTagName('main')[0];
        let template = document.getElementById('templatePost');
        let newPost = template.content.cloneNode(true).childNodes[1];
        events.eLikePost(newPost);
        newPost.id = photoPost.id;
        newPost.childNodes[1].textContent = photoPost.author;
        newPost.childNodes[3].firstChild.src = photoPost.photoLink;
        newPost.childNodes[7].firstChild.textContent = photoPost.descriprion;
        newPost.childNodes[9].firstChild.textContent = photoPost.hashtags;
        newPost.childNodes[11].firstChild.textContent = 'Фото было опубликовано ' + formatDate(photoPost.createdAt);
        if (photoPost.likes.indexOf(user) !== -1) {
            newPost.childNodes[5].style.color = '#c00';
            newPost.childNodes[5].style.transform = 'scale(1.2)';
        }
        if (user === photoPost.author) {
            showButtonEditPost(newPost);
            showButtonTrash(newPost);
        }
        main.insertBefore(newPost, main.childNodes[main.childNodes.length - 2]);
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
            hashtags.textContent = photoPost.hashtags;
        }
    };

    let showElementsForAuthUser = function () {
        showUserName();
        showButtonAddFoto();
        showButtonSignIn();
    }; //

    let showFilterUsers = function () {
        let dataUsers = document.getElementById('userNames');
        photoPostsArray.forEach(function (item) {
            let userName = document.createElement('option');
            userName.value = item.author;
            dataUsers.appendChild(userName);
        })
    };

    let showFilterHashtags = function () {
        let dataUsers = document.getElementById('hashtags');
        let uniqueHashtags = new Set();
        photoPostsArray.forEach(function (item) {
            item.hashtags.forEach(function (hashtag) {
                uniqueHashtags.add(hashtag);
            });
        });
        uniqueHashtags.forEach(function (item) {
            let hashtag = document.createElement('option');
            hashtag.value = item;
            dataUsers.appendChild(hashtag);
        })
    };

    let likePost = function (id) {
        let post = document.getElementById(id);
        let heart = post.getElementsByClassName('fa-heart')[0];
        heart.style.transition = '.2s';
        heart.style.color = '#c00';
        heart.style.transform = 'scale(1.2)';
    };

    let unLikePost = function (id) {
        let post = document.getElementById(id);
        let heart = post.getElementsByClassName('fa-heart')[0];
        heart.style.transition = '.2s';
        heart.style.color = '#474143';
        heart.style.transform = 'scale(1)';
    };

    return {
        showPhotoPosts,
        addPhotoPost,
        removePhotoPost,
        editPhotoPost,
        showElementsForAuthUser,
        showFilterUsers,
        showFilterHashtags,
        likePost,
        unLikePost
    }

})();

function showPhotoPosts(skip, top, filterConfig) {
    let postsArray = dataFunc.getPhotoPosts(skip, top, filterConfig);
    if (typeof postsArray === 'object') {
        domFunc.showPhotoPosts(postsArray);
        return true;
    }
    return false;
}

function addPhotoPost(PhotoPost) {
    if (dataFunc.addPhotoPost(PhotoPost)) {
        domFunc.addPhotoPost(PhotoPost);
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

function editPhotoPost(id, photoPost) {
    if (dataFunc.editPhotoPost(id, photoPost)) {
        domFunc.editPhotoPost(id, photoPost);
        return true;
    }
    return false;
}

function showElementsForUser() {
    if (user !== null) {
        domFunc.showElementsForAuthUser();
    }
    else {
        let header = document.getElementsByTagName('header');
        let headerSingOut = document.createElement('div');
        headerSingOut.className = 'headerSingInOut';
        let singOutLink = document.createElement('a');
        singOutLink.href = '#';
        let singOutImg = document.createElement('i');
        singOutImg.className = 'fas fa-sign-in-alt';
        singOutLink.appendChild(singOutImg);
        headerSingOut.appendChild(singOutLink);
        header[0].appendChild(headerSingOut);
        let portalName = document.querySelector('.headerPortalName');
        portalName.style.width = '90vw';
    }
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

let events = (function () {

    function resetPosts() {
        let main = document.getElementsByClassName('postBox');
        let posts = Array.prototype.slice.call(main);
        posts.forEach(function (post) {
            post.remove();
        });
    }

    function filtingPhotoPosts() {
        resetPosts();
        showPhotoPosts(0, 8, filterConfig);
    }

    function showMorePhotoPosts() {
        let cntShowPosts = document.getElementsByClassName('postBox').length;
        showPhotoPosts(cntShowPosts, 8, filterConfig);
    }

    function showModalRemovePost(event) {
        let modalWindow = document.getElementById('modalWindowConfirmDelete');
        modalWindow.style.display = 'flex';
        let buttonConfirm = document.forms.confirmDelete.childNodes[1];
        buttonConfirm.onclick = removePhotoPost;
        buttonConfirm.value = this.id;
        let buttonReset = document.forms.confirmDelete.childNodes[3];
        buttonReset.addEventListener('click', function () {
            modalWindow.style.display = 'none';
        });
    }

    let eLikePost = function (post) {
        post.addEventListener('click', likePost);
    };

    let eRemovePost = function (post) {
        post.addEventListener('click', showModalRemovePost);
    };

    let eShowMorePhotoPosts = function () {
        let moreFotoButton = document.getElementsByClassName('moreFotoButton')[0];
        moreFotoButton.addEventListener('click', showMorePhotoPosts)
    };

    let filterByAuthor = function () {
        let filtForm = document.forms.author;
        let filtInput = filtForm.childNodes[1];
        let author = filtInput.value;
        filterConfig.author = author;
        filtingPhotoPosts();
    };

    let filterByDate = function () {
        let filtForm = document.forms.date;
        let filtInput = filtForm.childNodes[1];
        let date = filtInput.value;
        if (date !== '') {
            let listDate = date.split('.');
            filterConfig.createdAt = new Date(listDate[2], listDate[1] - 1, listDate[0]);
        }
        else {
            filterConfig.createdAt = {};
        }
        filtingPhotoPosts();
    };

    let filterByHashtags = function () {
        let filtForm = document.forms.hashtags;
        let filtInput = filtForm.childNodes[1];
        let hashtags = filtInput.value;
        let listHashtags = hashtags.split(' ');
        if (listHashtags.length !== 1 || listHashtags[0] !== '') {
            filterConfig.hashtags = listHashtags;
        }
        else {
            filterConfig.hashtags = [];
        }
        filtingPhotoPosts();
    };

    return {
        eLikePost,
        eRemovePost,
        eShowMorePhotoPosts,
        filterByAuthor,
        filterByDate,
        filterByHashtags
    }
})();

showPhotoPosts(0, 8, filterConfig);

showElementsForUser();

domFunc.showFilterUsers();

domFunc.showFilterHashtags();

events.eShowMorePhotoPosts();