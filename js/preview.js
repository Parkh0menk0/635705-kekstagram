'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var listComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var getCommentElement = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

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

  var showBigPicture = function (descriptions) {
    var pictureCancel = bigPicture.querySelector('.big-picture__cancel');
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img img').src = descriptions.url;
    bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
    bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;

    pictureCancel.addEventListener('click', function () {
      closeBigPicture();
    });

    document.addEventListener('keydown', onBigPictureEscPress);

    renderComments(descriptions.comments);
  };

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.preview = {
    show: showBigPicture
  }
})();
