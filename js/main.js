'use strict';

var DESCRIPTIONS_COUNTS = 25;

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

var random = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var createComments = function () {
  var comments = [];
  for (var i = 0; i < random(1, 100); i++) {
    var comment = {
      avatar: 'img/avatar-' + random(1, 6) + '.svg',
      message: MESSAGES[random(1, 6)],
      name: NAMES[random(1, 6)]
    }
    comments.push(comment);
  }
  return comments;
}

var createDescription = function () {
  var description = {
    url: random(1, 25),
    likes: random(15, 200),
    comments: createComments()
  }
  return description;
}

var getDescriptions = function (num) {
  var descriptions = [];
  for (var j = 0; j < num; j++) {
    descriptions[j].push(createDescription());
  }
  return descriptions;
};

var descriptions = getDescriptions(DESCRIPTIONS_COUNTS);
