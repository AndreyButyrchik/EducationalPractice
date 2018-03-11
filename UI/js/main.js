let user = 'Вася Пупкин';

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
        hashtags: ['#cool', '#smile', '#positive'],
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
            return NaN;
        }
        for (var i = 0; i < photoPostsArray.length; i++) {
            if (photoPostsArray[i].id === id) {
                return photoPostsArray[i];
            }
        }
        return NaN;
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
        for (var i = 0; i < photoPostsArray.length; i++) {
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
        for (var i = 0; i < photoPostsArray.length; i++) {
            if (photoPostsArray[i].id === id) {
                photoPostsArray[i].removed = true;
                photoPostsArray.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    let editPhotoPost = function (id, photoPost) {
        var sourcePhotoPost = getPhotoPost(id);
        if (sourcePhotoPost) {
            if (validatePhotoPost(sourcePhotoPost)) {
                var flag = false;
                if ('descriprion' in photoPost &&
                    photoPost.descriprion.length < 200 &&
                    photoPost.descriprion.length !== 0) {
                    sourcePhotoPost.descriprion = photoPost.descriprion;
                    flag = true;
                }
                if ('photoLink' in photoPost &&
                    photoPost.photoLink.length !== 0) {
                    sourcePhotoPost.photoLink = photoPost.photoLink;
                    flag = true;
                }
                if ('hashtags' in photoPost &&
                    photoPost.hashtags.length !== 0 &&
                    photoPost.hashtags.every(function (item) {
                        return item.charAt(0) === "#";
                    })) {
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

        for (var i = skip; i < Math.min(skip + top, photoPostsArray.length); i++) {
            if (!validatePhotoPost(photoPostsArray[i])) {
                return false;
            }
        }


        var filtPhotoPosts = photoPostsArray.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });


        if (typeof  filterConfig === "object") {
            if ("createdAt" in filterConfig &&
                typeof filterConfig.createdAt === "object" &&
                filterConfig.createdAt instanceof Date) {
                filtPhotoPosts = filtPhotoPosts.filter(function (item) {
                    return item.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                        item.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                        item.createdAt.getDay() === filterConfig.createdAt.getDay();
                });
            }


            if ("author" in filterConfig &&
                typeof filterConfig.author === "string" &&
                filterConfig.author.length !== 0) {
                filtPhotoPosts = filtPhotoPosts.filter(function (item) {
                    return item.author === filterConfig.author;
                });
            }


            if ("hashtags" in filterConfig &&
                typeof filterConfig.hashtags === "object" &&
                filterConfig.hashtags instanceof Array) {
                filtPhotoPosts = filtPhotoPosts.filter(function (item) {
                    for (var i = 0, flag = true; i < filterConfig.hashtags.length; i++) {
                        if (item.hashtags.indexOf(filterConfig.hashtags[i]) === -1) {
                            flag = false;
                        }
                    }
                    return flag;
                });
            }
        }

        return filtPhotoPosts.slice(skip, skip + top);
    };

    return {
        getPhotoPost,
        validatePhotoPost,
        removePhotoPost,
        addPhotoPost,
        editPhotoPost,
        getPhotoPosts
    }
})();

let domFunc = (function () {
    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    let showPhotoPosts = function (postsArray) {
        postsArray.reverse();
        postsArray.forEach(function (item) {
            addPhotoPost(item);
        });
    };

    let addPhotoPost = function (photoPost) {
        let main = document.getElementsByTagName('main');
        let newPost = document.createElement('div');
        newPost.className = 'postBox';
        newPost.id = photoPost.id;

        let userName = document.createElement('h2');
        userName.textContent = photoPost.author;
        newPost.appendChild(userName);

        let fotoSpace = document.createElement('div');
        fotoSpace.className = 'fotoSpace';
        let foto = document.createElement('img');
        foto.className = 'foto';
        foto.src = photoPost.photoLink;
        fotoSpace.appendChild(foto);
        newPost.appendChild(fotoSpace);

        let likeButton = document.createElement('a');
        let likeImage = document.createElement('i');
        likeImage.className = 'fas fa-heart';
        likeButton.appendChild(likeImage);
        newPost.appendChild(likeButton);

        let editButton = document.createElement('a');
        let editImage = document.createElement('i');
        editImage.className = 'fas fa-edit';
        editButton.appendChild(editImage);
        newPost.appendChild(editButton);

        let trashButton = document.createElement('a');
        let trashImage = document.createElement('i');
        trashImage.className = 'fas fa-trash-alt';
        trashButton.appendChild(trashImage);
        newPost.appendChild(trashButton);

        let commentBox = document.createElement('div');
        commentBox.className = 'commentBox box';
        let comment = document.createElement('p');
        comment.textContent = photoPost.descriprion;
        commentBox.appendChild(comment);
        newPost.appendChild(commentBox);

        let hashtagsBox = document.createElement('div');
        hashtagsBox.className = 'hashtagsBox box';
        let hashtags = document.createElement('p');
        hashtags.textContent = photoPost.hashtags;
        hashtagsBox.appendChild(hashtags);
        newPost.appendChild(hashtagsBox);

        let dateBox = document.createElement('div');
        dateBox.className = 'dateBox';
        let date = document.createElement('p');
        date.textContent = 'Фото было опубликовано ' + formatDate(photoPost.createdAt);
        dateBox.appendChild(date);
        newPost.appendChild(dateBox);

        main[0].insertBefore(newPost, main[0].childNodes[2]);
    };

    let removePhotoPost = function (id) {
        let removePost = document.getElementById(id);
        removePost.remove();
    };

    let editPhotoPost = function () {

    };

    let showElementsForAuthUser = function () {

    };

    return {
        showPhotoPosts,
        addPhotoPost,
        removePhotoPost,
        editPhotoPost,
        showElementsForAuthUser
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
    if (dataFunc.validatePhotoPost(PhotoPost)) {
        domFunc.addPhotoPost(PhotoPost);
        return true;
    }
    return false;
}

function removePhotoPost(id) {
    if(dataFunc.removePhotoPost(id)){
        domFunc.removePhotoPost(id);
        return true;
    }
    return false;
}

showPhotoPosts(1, 8);

addPhotoPost(photoPostsArray[0]);

removePhotoPost('1');
