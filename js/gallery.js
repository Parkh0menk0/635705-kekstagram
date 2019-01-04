'use strict';

(function () {
  var ACTIVE_CLASS_NAME = 'img-filters__button--active';

  var similarListPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var filters = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  
  var pictures = [];

  /**
   * Удаление картинок из DOM.
   */
  var cleanPictures = function () {
    var deletingPictures = similarListPictures.querySelectorAll('.picture');
    deletingPictures.forEach(function (item) {
      similarListPictures.removeChild(item);
    });
  };

  /**
   * Функция сортировки фотографий в порядке убывания количества комментариев.
   */
  var showMostDiscussed = function () {
    var picturesSorting = originPictures.slice();
    picturesSorting.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      }
      return 0;
    });
    renderPictures(picturesSorting);
  }

  /**
   * Функция для 10 случайных, не повторяющихся фотографий.
   */
  var unique = function () {
    var obj = {};
    for (var i = 0; i < originPictures.length; i++) {
      var str = originPictures[i];
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
    var uniqueArray = Object.keys();
    uniqueArray.length = 10;
    renderPictures(uniqueArray);
  };
  
  /**
   * Фокус на кнопках перебора.
   *
   * @param {String} value - ID элемента.
   */
  var applyFilter = function(value) {
    switch (value) {
      case 'filter-popular':
        showOriginal();
        break;
      case 'filter-new':
        showRandom();
        break;
      case 'filter-discussed':
        showMostDiscussed();
        break;
    }
  };

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
    
    descriptions.forEach(function (item) {
      fragment.appendChild(getPictureElement(item));
    });
    
    similarListPictures.appendChild(fragment);
  };
  
  var onSuccess = function(data) {
    pictures = data;
    renderPictures(pictures);
  }

  var onError = function (errorMessage) {
    window.validation.openError(errorMessage);
  };

  var originPictures = window.backend.load(onSuccess, onError);

  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', function(evt) {
    if (evt.target.type !== 'button') {
      return;
    }
    var button = evt.target;
    var activeButton = filters.querySelector('.' + ACTIVE_CLASS_NAME);
    if (activeButton !== button) {
      activeButton.classList.remove(ACTIVE_CLASS_NAME);
      button.classList.add(ACTIVE_CLASS_NAME);
    }
    applyFilter(button.id);
  });
})();
