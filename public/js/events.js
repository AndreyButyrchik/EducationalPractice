let events = (function () {
    let fileTypes = [
        'image/jpeg',
        'image/img',
        'image/png',
        'image/jpg'
    ];

    let currentEditedPost = null;

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function validFileType(file) {
        for (let i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let dtfiles = dt.files;
        let file = Array.from(dtfiles);
        if (validFileType(file[0])) {
            upload(file[0]);
            domFunc.checkSuccess();
        }
        else {
            domFunc.checkInvalid();
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
        domFunc.resetFormAddPhoto();

        let submit = document.getElementsByName('publishPost')[0];
        submit.removeEventListener('click', eEditPost);
        submit.removeEventListener('click', eAddPost);
    }

    let showModalRemovePost = function (event) {
        let modalWindow = document.getElementById('modalWindowConfirmDelete');
        domFunc.showModalRemovePost();

        let buttonConfirm = document.getElementsByName('Yes')[0];
        buttonConfirm.onclick = removePhotoPost;
        buttonConfirm.value = event.target.parentElement.id;

        let buttonReset = document.getElementsByName('No')[0];
        buttonReset.addEventListener('click', function () {
            modalWindow.classList.remove('visible');
            modalWindow.classList.add('hidden');
        });
    };

    let eLikePost = function (post) {
        post.addEventListener('click', likePost);
    };

    let eSingIn = function () {
        domFunc.showModalSingIn();
        let buttonNext = document.getElementsByName('next')[0];
        buttonNext.onclick = domFunc.logIn;
    };

    let logOut = function () {
        user = null;
        domFunc.logOut();
    };

    let eShowMorePhotoPosts = function () {
        let cntShowPosts = document.getElementsByClassName('postBox').length;
        console.log(cntShowPosts);
        showPhotoPosts(cntShowPosts, 8, filterConfig, false);
    };

    let filterByAuthor = function () {
        let filtForm = document.forms.author;
        let filtInput = filtForm.childNodes[1];
        filterConfig.author = filtInput.value;
        domFunc.filtingPhotoPosts();
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
        domFunc.filtingPhotoPosts();
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
        domFunc.filtingPhotoPosts();
    };

    let upload = async function (e) {
        let file = e.target.files[0];
        if (validFileType(file)) {
            domFunc.checkSuccess();
            let formData = new FormData();
            formData.append('upPhoto', file);
            let submitPost = document.forms.submitPost;
            try {
                submitPost.value = await requestFunctions.uploadFile(formData);
            } catch (err) {
                console.log(`Ooops ${err}`);
            }
        }
        else {
            domFunc.checkInvalid();
            return false;
        }
        return true;
    };

    let eShowModalAddPost = function () {
        resetFormAddPhoto();
        let inputFile = document.getElementsByName('upPhoto')[0];
        inputFile.onchange = upload;
        domFunc.showModalAddEditPost();
        eDropDownArea();
        let submit = document.getElementsByName('publishPost')[0];
        submit.addEventListener('click', eAddPost);
    };

    let eShowModalEditPost = function (event) {
        resetFormAddPhoto();
        let inputFile = document.getElementsByName('upPhoto')[0];
        inputFile.onchange = upload;
        let post = event.target.parentElement;
        currentEditedPost = post;
        domFunc.showModalEdit(post);
        eDropDownArea();
        domFunc.checkSuccess();
        let submit = document.getElementsByName('publishPost')[0];
        submit.addEventListener('click', eEditPost);
    };

    let eAddPost = async function () {
        let addForm = document.forms.submitPost;
        let inputDescription = document.getElementsByName('addDescription')[0];
        let inputHashtags = document.getElementsByName('addHashtags')[0];
        let photoPost = {
            id: ``,
            descriprion: `${inputDescription.value}`,
            createdAt: new Date(),
            author: user,
            photoLink: `${addForm.value}`,
            hashtags: inputHashtags.value.split(' '),
            likes: [''],
            removed: false
        };

        if (inputDescription.value.length !== 0 &&
            new RegExp(inputHashtags.getAttribute("pattern")).test(inputHashtags.value) &&
            addPhotoPost(photoPost, true)) {
            let modalWindow = document.getElementById('modalWindowAddEditPhotoPost');
            modalWindow.classList.remove('visible');
            modalWindow.classList.add('hidden');
            return true;
        }
        domFunc.checkInvalid();
        return false;
    };

    let eEditPost = function () {
        let editForm = document.forms.submitPost;
        let inputDescription = document.getElementsByName('addDescription')[0];
        let inputHashtags = document.getElementsByName('addHashtags')[0];
        let photoPost = {
            id: currentEditedPost.id,
            descriprion: `${inputDescription.value}`,
            createdAt: currentEditedPost.createdAt,
            author: user,
            photoLink: `${editForm.value}`,
            hashtags: inputHashtags.value.split(' '),
            likes: currentEditedPost.likes,
            removed: false
        };

        if (inputDescription.value.length !== 0 &&
            new RegExp(inputHashtags.getAttribute("pattern")).test(inputHashtags.value) &&
            editPhotoPost(currentEditedPost.id, photoPost)) {
            let modalWindow = document.getElementById('modalWindowAddEditPhotoPost');
            modalWindow.classList.remove('visible');
            modalWindow.classList.add('hidden');
            return true;
        }
        domFunc.checkInvalid();
        return false;
    };

    let closeWindow = function (event) {
        if (event.target.id === 'modalWindowAddEditPhotoPost' ||
            event.target.id === 'modalWindowConfirmDelete' ||
            event.target.id === 'modalWindowSingIn' ||
            event.target.id === 'modalWindowError') {
            let modalWindow = event.target;
            modalWindow.classList.remove('visible');
            modalWindow.classList.add('hidden');
        }
    };

    let eToMain = function () {
        let modalWindow = document.getElementById('modalWindowError');
        modalWindow.classList.remove('visible');
        modalWindow.classList.add('hidden');

        filterConfig = {createdAt: {}, author: '', hashtags: []};
        showPhotoPosts(0, 8, filterConfig, true);
    };

    return {
        eLikePost,
        showModalRemovePost,
        eSingIn,
        logOut,
        eShowModalAddPost,
        eShowModalEditPost,
        closeWindow,
        eShowMorePhotoPosts,
        filterByAuthor,
        filterByDate,
        filterByHashtags,
        eToMain
    }
})();