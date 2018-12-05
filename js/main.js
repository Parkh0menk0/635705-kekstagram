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
var fragment = document.createDocumentFragment();
var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var socialComments = document.querySelector('.social__comments');

var random = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var createComments = function () {
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

var createDataItem = function (index) {
  var temp = {
    url: 'photos/' + (index + 1) + '.jpg',
    likes: random(15, 200),
    comments: createComments()
  };
  return temp;
};

var getData = function (num) {
  var temp = [];
  for (var j = 0; j < num; j++) {
    temp.push(createDataItem(j));
  }
  return temp;
};

var renderPicture = function (description) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;
  pictureElement.querySelector('.picture__comments').textContent = description.comments;

  return pictureElement;
};

var showBigPicture = function (descriptions) {
  var bigPicture = document.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img').src = descriptions.url;
  bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
  bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;
};

data = getData(DATA_COUNT);

for (var i = 0; i < data.length; i++) {
  fragment.appendChild(renderPicture(data[i]));
}

similarListElement.appendChild(fragment);

document.querySelector('.big-picture').classList.remove('hidden');

showBigPicture(data[0]);

socialComments.querySelector('.social__picture').src = data[0].comments.avatar;
socialComments.querySelector('.social__text').textContent = data[0].comments.message;

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
