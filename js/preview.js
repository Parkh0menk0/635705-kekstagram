'use strict';

(function () {
  var COMMENTS_LIMIT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var listComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var picture;
  var startIndexComment;

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
   * @return {object} «глубокая» копия элемента social__comment – вместе с атрибутами, включая подэлементы.
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

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(getCommentElement(comments[i]));
    }

    listComments.appendChild(fragment);
  };

  /**
   * Функция для заполнения и показа big-picture.
   * @function
   * @param {array} descriptions массив из которого берется информация.
   */
  var showBigPicture = function (descriptions) {
    picture = descriptions;
    startIndexComment = 0;
    var pictureCancel = bigPicture.querySelector('.big-picture__cancel');

    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = descriptions.url;
    bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
    bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;

    cleanComments();

    pictureCancel.addEventListener('click', function () {
      closeBigPicture();
    });

    document.addEventListener('keydown', onBigPictureEscPress);

    showNextComments();
  };

  /**
   * Функция, очищающая список комментариев.
   * @function
   */
  var cleanComments = function () {
    listComments.innerHTML = '';
  };

  /**
   * Функция, отображающая список комментариев не полностью, а по пять элементов для фотографии в полноэкранном режиме.
   * @function
   */
  var showNextComments = function () {
    var renderingComments = picture.comments.slice(startIndexComment, startIndexComment + COMMENTS_LIMIT);
    renderComments(renderingComments);
    startIndexComment += COMMENTS_LIMIT;

    var allComments = picture.comments.length;
    var showedComments = listComments.childNodes.length;
    // показывается актуальное количество отрисованных комментариев и полное количество комментариев
    socialCommentCount.innerHTML = showedComments + ' из <span class="comments-count">' + allComments + '</span> комментариев</div>';

    if (picture.comments.length <= (startIndexComment)) {
      commentsLoader.classList.add('visually-hidden');
    }
  };

  /**
   * Функция-обработчик для события нажатия на кнопку "Загрузить еще".
   * @function
   */
  var onCommentsLoaderClick = function () {
    showNextComments();
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  window.preview = {
    show: showBigPicture
  };
})();
