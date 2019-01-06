'use strict';

(function () {
  var COMMENTS_LIMIT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var listComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var firstCommentIndex = 0;
  var lastCommentIndex = firstCommentIndex + COMMENTS_LIMIT;

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
   * Функция формирующая комментарий.
   * @function
   * @param {object} comment объект, который содержит данные, которые будут добавлены DOM-элементам;
   */
  var getCommentElement = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  /**
   * Функция генерирующая картинки.
   * @function
   * @param {array} comments - массив объектов, который содержит данные,
   * которые будут добавлены в конец DOM-элемента с классом social__comments;
   */
  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    if (lastCommentIndex >= comments.length) {
      lastCommentIndex = comments.length;
      commentsLoader.classList.add('hidden');
    }

    socialCommentCount.firstChild.textContent = lastCommentIndex + ' из ';

    firstCommentIndex = lastCommentIndex;
    // удаление комментариев
    while (listComments.firstChild) {
      listComments.removeChild(listComments.firstChild);
    }

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(getCommentElement(comments[i]));
    }

    listComments.appendChild(fragment);
  };

  var onCommentsLoaderElementClick = function () {
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    listComments.appendChild(renderComments(descriptions.comments));
    commentsLoader.removeEventListener('click', onCommentsLoaderElementClick);
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

    if (copyCommentsArray.length > COMMENTS_LIMIT) {
      copyCommentsArray.splice(COMMENTS_LIMIT);
      listComments.appendChild(renderComments(copyCommentsArray));
      socialCommentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', onCommentsLoaderElementClick);
    } else {
      listComments.appendChild(renderComments(copyCommentsArray));
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    }
  };

  window.preview = {
    show: showBigPicture
  };
})();
