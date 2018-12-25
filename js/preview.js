'use strict';

(function () {
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = [
    'Артём',
    'Игорь',
    'Ефим',
    'Ульяна',
    'Таисия',
    'Виктория'
  ];

  var bigPicture = document.querySelector('.big-picture');
  var listComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var getComments = function () {
    var comments = [];
    var num = random(1, 100);
    for (var i = 0; i < num; i++) {
      var comment = {
        avatar: 'img/avatar-' + random(1, 6) + '.svg',
        message: MESSAGES[random(0, 5)],
        name: NAMES[random(0, 5)]
      };
      comments.push(comment);
    }
    return comments;
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

})();
