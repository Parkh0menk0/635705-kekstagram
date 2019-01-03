'use strict';

(function () {
  var similarListPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var filters = document.querySelector('.img-filters');
  var filterType = document.querySelectorAll('.img-filters__button');

  var getPictureElement = function (description) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = description.url;
    pictureElement.querySelector('.picture__likes').textContent = description.likes;
    pictureElement.querySelector('.picture__comments').textContent = description.comments;

    pictureElement.addEventListener('click', function () {
      window.preview.show(description);
    });

    return pictureElement;
  };

  var renderPictures = function (descriptions) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < descriptions.length; i++) {
      fragment.appendChild(getPictureElement(descriptions[i]));
    }

    similarListPictures.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    window.validation.openError(errorMessage);
  };

  window.backend.load(renderPictures, onError);

  var picturesArr = []; // инициализация для линта
  // var picturesArr = renderPictures( ?? );

  filters.classList.remove('img-filters--inactive');

  filterType[0].addEventListener('click', function () {
    var picture = similarListPictures.querySelectorAll('.picture');
    for (var i = 0; i < picture.length; i++) {
      similarListPictures.removeChild(picture[i]);
    }
    renderPictures(picturesArr);
  });

  var unique = function (arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
    var uniqueArray = Object.keys();
    uniqueArray.length = 10;
    return uniqueArray;
  };

  filterType[1].addEventListener('click', function () {
    var picture = similarListPictures.querySelectorAll('.picture');
    for (var i = 0; i < picture.length; i++) {
      similarListPictures.removeChild(picture[i]);
    }
    renderPictures(unique(picturesArr));
  });

  filterType[2].addEventListener('click', function () {
    var picture = similarListPictures.querySelectorAll('.picture');
    for (var i = 0; i < picture.length; i++) {
      similarListPictures.removeChild(picture[i]);
    }
    var picturesCopyArr = picturesArr.slice().sort(function (first, second) {
      var result = 0;
      if (first.comments.localeCompare(second.comments) === 1) {
        result = 1;
      }
      if (first.comments.localeCompare(second.comments) === -1) {
        result = -1;
      }
      return result;
    });
    renderPictures(picturesCopyArr);
  });
})();
