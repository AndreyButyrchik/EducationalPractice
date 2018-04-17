let events = (function () {
    let fileTypes = [
        'image/jpeg',
        'image/img',
        'image/png',
        'image/jpg'
    ];

    let currentEditedPost = null;

    function resetPosts() {
        let postList = document.getElementsByClassName('postBox');
        let posts = Array.prototype.slice.call(postList);
        posts.forEach(function (post) {
            post.remove();
        });
    }

    function filtingPhotoPosts() {
        resetPosts();
        if (!showPhotoPosts(0, 8, filterConfig)) {
            let error = document.getElementById('modalWindowError');
            error.style.display = 'flex';
            let message = error.getElementsByTagName('p')[0];
            message.textContent = 'Не найдено постов с заданными фильтрами';
        }
    }

    function logIn() {
        let modalWindow = document.getElementById('modalWindowSingIn');
        let inputLogin = document.getElementsByName('login')[0];
        let inputPassword = document.getElementsByName('password')[0]; // ?
        if (inputLogin.checkValidity() && inputPassword.checkValidity()) {
            user = inputLogin.value;
            let buttonSignOut = document.getElementsByClassName('headerSingInOut')[0];
            buttonSignOut.remove();
            domFunc.showElementsForAuthUser();
            modalWindow.style.display = 'none';
        }
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function setImgSrc(src) {
        let submitPost = document.forms.submitPost;
        submitPost.value = src;
    }

    function loadFoto(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImgSrc(reader.result);
        };
    }

    function validFileType(file) {
        for (let i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }

    function checkSuccess() {
        let window = document.getElementById('modalWindowAddEditPhotoPost');
        let modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
        let drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];

        let upLoadIcon = drugDrop.getElementsByClassName('fas')[0];
        upLoadIcon.className = 'fas fa-check';
        upLoadIcon.style.color = '#0f0';

        let label = drugDrop.getElementsByClassName('chous')[0];
        label.textContent = 'Фото загружено';
    }

    function checkInvalid() {
        let window = document.getElementById('modalWindowAddEditPhotoPost');
        let modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
        let drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];

        let upLoadIcon = drugDrop.getElementsByClassName('fas')[0];
        upLoadIcon.className = 'fas fa-exclamation-circle';
        upLoadIcon.style.color = '#f00';

        let label = drugDrop.getElementsByClassName('chous')[0];
        label.textContent = 'Ошибка';

        let submitForm = document.forms.submitPost;
        document.getElementsByName('addDescription')[0].value = '';
        document.getElementsByName('addHashtags')[0].value = [];
        submitForm.value = '';
    }

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let dtfiles = dt.files;
        let file = Array.from(dtfiles);
        if (validFileType(file[0])) {
            loadFoto(file[0]);
            checkSuccess();
        }
        else {
            checkInvalid();
        }

    }

    function eDropDownArea() {
        let dropArea = document.getElementsByClassName('drug-drop')[0];
        let ePrefDefaults = ['dragenter', 'dragover', 'dragleave', 'drop'];
        ePrefDefaults.forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
        });

        let eHighLight = ['dragenter', 'dragover'];
        eHighLight.forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });

        let eUnHighLight = ['dragleave', 'drop'];
        eUnHighLight.forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });

        dropArea.addEventListener('drop', handleDrop, false);

        function highlight(e) {
            dropArea.classList.add('highlight')
        }

        function unhighlight(e) {
            dropArea.classList.remove('highlight')
        }
    }

    function resetFormAddPhoto() {
        let window = document.getElementById('modalWindowAddEditPhotoPost');
        let modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
        let drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];

        let upLoadIcon = drugDrop.getElementsByClassName('fas')[0];
        upLoadIcon.className = 'fas fa-upload';
        upLoadIcon.style.color = '#474143';

        let label = drugDrop.getElementsByClassName('chous')[0];
        label.textContent = 'Перетащите фото для загрузки';

        let submitForm = document.forms.submitPost;
        document.getElementsByName('addDescription')[0].value = '';
        document.getElementsByName('addHashtags')[0].value = [];
        submitForm.value = '';
        document.getElementsByName('publishPost')[0].textContent = 'Опубликовать';

        let submit = document.getElementsByName('publishPost')[0];
        submit.removeEventListener('click', eEditPost);
        submit.removeEventListener('click', eAddPost);
    }

    let eChooseFile = function () {
        let file = document.getElementById('upPhoto').files;
        if (file.length === 0) {
            checkInvalid();
        } else {
            if (validFileType(file[0])) {
                loadFoto(file[0]);
                checkSuccess();
            }
            else {
                checkInvalid();
            }
        }
        return false;
    };

    let showModalRemovePost = function (event) {
        let modalWindow = document.getElementById('modalWindowConfirmDelete');
        modalWindow.style.display = 'flex';
        let buttonConfirm = document.getElementsByName('Yes')[0];
        buttonConfirm.onclick = removePhotoPost;
        buttonConfirm.value = event.target.parentElement.id;
        let buttonReset = document.getElementsByName('No')[0];
        buttonReset.addEventListener('click', function () {
            modalWindow.style.display = 'none';
        });
    };

    let eLikePost = function (post) {
        post.addEventListener('click', likePost);
    };

    let eSingIn = function () {
        let modalWindow = document.getElementById('modalWindowSingIn');
        modalWindow.style.display = 'flex';
        let buttonNext = document.getElementsByName('next')[0];
        buttonNext.onclick = logIn;
    };

    let logOut = function () {
        user = null;

        let author = document.getElementsByClassName('headerUserName')[0];
        author.remove();

        let buttonAddPhoto = document.getElementsByClassName('headerAddFoto')[0];
        buttonAddPhoto.remove();

        let buttonSignOut = document.getElementsByClassName('headerSingInOut')[0];
        buttonSignOut.remove();

        domFunc.showButtonSingIn();

        let posts = document.getElementsByClassName('postBox');
        [].forEach.call(posts, function (item) {
            let like = item.getElementsByClassName('fa-heart')[0];
            like.className = 'fas fa-heart unlike';

            let edit = item.getElementsByClassName('fa-edit')[0];
            let trash = item.getElementsByClassName('fa-trash-alt')[0];
            if (edit !== undefined || trash !== undefined) {
                edit.remove();
                trash.remove();
            }
        });

    };

    let eShowMorePhotoPosts = function () {
        let cntShowPosts = document.getElementsByClassName('postBox').length;
        showPhotoPosts(cntShowPosts, 8, filterConfig, false);
    };

    let filterByAuthor = function () {
        let filtForm = document.forms.author;
        let filtInput = filtForm.childNodes[1];
        filterConfig.author = filtInput.value;
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

    let eShowModalAddPost = function () {
        resetFormAddPhoto();
        let window = document.getElementById('modalWindowAddEditPhotoPost');
        window.style.display = 'flex';
        let modalWindow = window.getElementsByClassName('modalBoxAddEditPhoto')[0];
        modalWindow.getElementsByTagName('h2')[0].textContent = user;
        modalWindow.getElementsByTagName('h4')[0].textContent = 'Дата: ' + formatDate(new Date());
        eDropDownArea();
        let submit = document.getElementsByName('publishPost')[0];
        submit.addEventListener('click', eAddPost);
    };

    let eShowModalEditPost = function (event) {
        resetFormAddPhoto();
        let post = event.target.parentElement;
        currentEditedPost = post;
        let description = post.getElementsByClassName('commentBox')[0].textContent;
        let hashtags = post.getElementsByClassName('hashtagsBox')[0].textContent;
        let window = document.getElementById('modalWindowAddEditPhotoPost');
        window.style.display = 'flex';
        let modalWindow = window.childNodes[1];
        document.getElementsByName('addDescription')[0].value = description;
        document.getElementsByName('addHashtags')[0].value = hashtags;
        document.getElementsByName('publishPost')[0].textContent = 'Изменить';
        modalWindow.getElementsByTagName('h2')[0].textContent = user;
        modalWindow.getElementsByTagName('h4')[0].textContent = 'Дата: ' + formatDate(new Date());
        eDropDownArea();
        checkSuccess();
        let drugDrop = modalWindow.getElementsByClassName('drug-drop')[0];
        let label = drugDrop.getElementsByClassName('chous')[0];
        label.textContent = 'Загрузить другое фото';
        document.forms.submitPost.value = post.getElementsByClassName('foto')[0].src;
        let submit = document.getElementsByName('publishPost')[0];
        submit.addEventListener('click', eEditPost);
    };

    let eAddPost = async function () {
        let addForm = document.forms.submitPost;
        let photoPost = {
            id: ``,
            descriprion: `${document.getElementsByName('addDescription')[0].value}`,
            createdAt: new Date(),
            author: user,
            photoLink: `${addForm.value}`,
            hashtags: document.getElementsByName('addHashtags')[0].value.split(' '),
            likes: [''],
            removed: false
        };

        if (addPhotoPost(photoPost, true)) {
            document.getElementById('modalWindowAddEditPhotoPost').style.display = 'none';
        }
    };

    let eEditPost = function () {
        let editForm = document.forms.submitPost;
        let photoPost = {
            id: currentEditedPost.id,
            descriprion: `${document.getElementsByName('addDescription')[0].value}`,
            createdAt: currentEditedPost.createdAt,
            author: user,
            photoLink: `${editForm.value}`,
            hashtags: document.getElementsByName('addHashtags')[0].value.split(' '),
            likes: currentEditedPost.likes,
            removed: false
        };

        if (editPhotoPost(currentEditedPost.id, photoPost)) {
            document.getElementById('modalWindowAddEditPhotoPost').style.display = 'none';
        }

    };

    let closeWindow = function (event) {
        if (event.target.id === 'modalWindowAddEditPhotoPost' ||
            event.target.id === 'modalWindowConfirmDelete' ||
            event.target.id === 'modalWindowSingIn' ||
            event.target.id === 'modalWindowError') {
            event.target.style.display = 'none';
        }
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
        eLikePost,
        showModalRemovePost,
        eShowMorePhotoPosts,
        filterByAuthor,
        filterByDate,
        filterByHashtags,
        eSingIn,
        logOut,
        eShowModalAddPost,
        eChooseFile,
        eShowModalEditPost,
        closeWindow
    }
})();