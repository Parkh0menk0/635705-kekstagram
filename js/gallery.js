'use strict';

(function () {
  var ACTIVE_CLASS_NAME = 'img-filters__button--active';

  var similarListPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var filters = document.querySelector('.img-filters');

  var pictures = [];

  /**
   * Удаление картинок из DOM.
   * @function
   */
  var cleanPictures = function () {
    var deletingPictures = similarListPictures.querySelectorAll('.picture');
    deletingPictures.forEach(function (item) {
      similarListPictures.removeChild(item);
    });
  };

  /**
   * Функция отрисовки фотографии в изначальном порядке.
   * @function
   */
  var showOriginal = function () {
    renderPictures(pictures);
  }

  /**
   * Функция для 10 случайных, не повторяющихся фотографий.
   * @function
   */
  var showRandom = function () {
    var arr = [];
    var data = pictures.slice();
    var index;
    var obj;
    
    for (var i = 0; i < 10; i++) {
      index = window.util.random(0, data.length - 1);
      obj = data.splice(index, 1)[0];
      arr.push(obj);
    }

    renderPictures(arr);
  };

  /**
   * Функция сортировки фотографий в порядке убывания количества комментариев.
   * @function
   */
  var showMostDiscussed = function () {
    var picturesSorting = pictures.slice();
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
   * Фокус на кнопках перебора.
   * @function
   * @param {String} value - ID элемента.
   */
  var applyFilter = function (value) {
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

  /**
   * Функция формирующая картинку.
   * @function
   * @param {object} description - объект, который содержит данные, которые будут добавлены DOM-элементу с классом picture;
   */
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

  /**
   * Функция генерирующая картинки.
   * @function
   * @param {array} descriptions - массив объектов, который содержит данные,
   * которые будут добавлены в конец DOM-элемента с классом pictures;
   */
  var renderPictures = function (descriptions) {
    var fragment = document.createDocumentFragment();

    descriptions.forEach(function (item) {
      fragment.appendChild(getPictureElement(item));
    });

    cleanPictures();
    similarListPictures.appendChild(fragment);
  };

  /**
   * Функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * @function
   * @param {array} data массив объектов, который содержит данные о картинках
   */
  var onSuccess = function (data) {
    pictures = data;
    renderPictures(pictures);
  }

  /**
   * Функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   * @function
   * @param {String} errorMessage сообщение об ошибке.
   */
  var onError = function (errorMessage) {
    window.validation.openError(errorMessage);
  };

  window.backend.load(onSuccess, onError);

  filters.classList.remove('img-filters--inactive');

  filters.addEventListener('click', function (evt) {
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
