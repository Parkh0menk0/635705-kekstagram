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

  var getComments = function () {
    var comments = [];
    var num = window.util.random(1, 100);
    for (var i = 0; i < num; i++) {
      var comment = {
        avatar: 'img/avatar-' + window.util.random(1, 6) + '.svg',
        message: MESSAGES[window.util.random(0, 5)],
        name: NAMES[window.util.random(0, 5)]
      };
      comments.push(comment);
    }
    return comments;
  };

  var getDataItem = function (index) {
    var temp = {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: window.util.random(15, 200),
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

  window.data = {
    generate: getData
  }
})();
