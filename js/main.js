'use strict';

var DATA_COUNT = 25;
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

var data = [];
var similarListPictures = document.querySelector('.pictures');
var similarListComments = document.querySelector('.social__comments');
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var similarCommentTemplate = document.querySelector('.social__comment');

var random = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
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

var getDataItem = function (index) {
  var temp = {
    url: 'photos/' + (index + 1) + '.jpg',
    likes: random(15, 200),
    comments: getComments()
  };
  return temp;
};

var getData = function (num) {
  var temp = [];
  for (var j = 0; j < num; j++) {
    temp.push(getDataItem(j));
  }
  return temp;
};

var getPictureElement = function (description) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;
  pictureElement.querySelector('.picture__comments').textContent = description.comments;

  return pictureElement;
};

var getCommentElement = function (comment) {
  var commentElement = similarCommentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var showBigPicture = function (descriptions) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').src = descriptions.url;
  bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
  bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(getCommentElement(comments[i]));
  }

  while (similarListComments.firstChild) {
    similarListComments.removeChild(similarListComments.firstChild);
  }

  similarListComments.appendChild(fragment);
};

var renderPictures = function (descriptions) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < descriptions.length; i++) {
    fragment.appendChild(getPictureElement(descriptions[i]));
  }

  similarListPictures.appendChild(fragment);
};

data = getData(DATA_COUNT);

renderPictures(data);
showBigPicture(data[0]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
