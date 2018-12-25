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
      showBigPicture(description);
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

  renderPictures(data);

})();
