'use strict';

(function () {
  var similarListPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

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
    var error = document.createElement('div');
    error.style.cssText = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; position = absolute; left = 0; right = 0; font-size = 30px;';
    error.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', error);
  };

  window.backend.load(renderPictures, onError);
})();
