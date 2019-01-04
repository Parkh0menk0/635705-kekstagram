'use strict';

(function () {
  var similarListPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var filters = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

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
   * @param  pressedButton - выбранный фильтр;
   * @param  notPressedButton - не выбранный фильтр;
   * @param  notPressedButtonToo - не выбранный фильтр;
   * @param {String} className - имя класса.
   */
  var backlighting = function (pressedButton, notPressedButton, notPressedButtonToo, className) {
    if (!pressedButton.classList.contains(className)) {
      pressedButton.classList.add(className);
    }

    if (notPressedButton.classList.contains(className)) {
      notPressedButton.classList.remove(className);
    }

    if (notPressedButtonToo.classList.contains(className)) {
      notPressedButtonToo.classList.remove(className);
    }
  }

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

  var originPictures = window.backend.load(onSucces, onError);

  filters.classList.remove('img-filters--inactive');

  filterPopular.addEventListener('click', function () {
    backlighting(filterPopular, filterNew, filterDiscussed, 'img-filters__button--active');
    renderPictures(originPictures);
  });

  filterNew.addEventListener('click', function () {
    backlighting(filterNew, filterPopular, filterDiscussed, 'img-filters__button--active');
    unique();
  });

  filterDiscussed.addEventListener('click', function () {
    backlighting(filterDiscussed, filterPopular, filterNew, 'img-filters__button--active');
    showMostDiscussed();
  });
})();
