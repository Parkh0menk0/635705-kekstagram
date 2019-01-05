'use strict';

(function () {
  var COMMENTS_START_POSITION = 0;
  var COMMENTS_LIMIT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var listComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentsLoader = bigPicture.querySelector('.comments-loader');

  /**
   * Функция создает обработчик событий для клавиши escape.
   * @function
   * @param {object} evt
   */
  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  /**
   * Функция закрытия окна изображения.
   * @function
   */
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  /**
   * Функция создает комментарий.
   * @function
   * @param {object} comment
   */
  var getCommentElement = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  /**
   * Функция создает комментарии
   * @function
   * @param {array} comments
   */
  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(getCommentElement(comments[i]));
    }

    while (listComments.firstChild) {
      listComments.removeChild(listComments.firstChild);
    }

    listComments.appendChild(fragment);
  };

  var onCommentsLoaderElementClick = function () {
    socialCommentCount.classList.add('hidden');
    socialCommentsLoader.classList.add('hidden');
    listComments.appendChild(renderComments(descriptions.comments));
    socialCommentsLoader.removeEventListener('click', onCommentsLoaderElementClick);
  };

  /**
   * Функция для заполнения и показа big-picture.
   * @function
   * @param {array} descriptions массив из которого берется информация.
   */
  var showBigPicture = function (descriptions) {
    var pictureCancel = bigPicture.querySelector('.big-picture__cancel');

    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = descriptions.url;
    bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
    bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;
    // очистка комментариев
    listComments.innerHTML = '';

    pictureCancel.addEventListener('click', function () {
      closeBigPicture();
    });

    document.addEventListener('keydown', onBigPictureEscPress);

    var copyCommentsArray = descriptions.comments.slice();

    if (descriptions.comments.length > COMMENTS_LIMIT) {
      copyCommentsArray.splice(COMMENTS_LIMIT);
      listComments.appendChild(renderComments(copyCommentsArray));
      socialCommentCount.classList.remove('hidden');
      socialCommentsLoader.classList.remove('hidden');
      socialCommentsLoader.addEventListener('click', onCommentsLoaderElementClick);
    } else {
      listComments.appendChild(renderComments(descriptions.comments));
      socialCommentCount.classList.add('hidden');
      socialCommentsLoader.classList.add('hidden');
    }
  };

  window.preview = {
    show: showBigPicture
  };
})();
