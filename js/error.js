'use strict';

(function () {
  var messageType = 'error';
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var fragment = document.createDocumentFragment();

  fragment.appendChild(errorTemplate.cloneNode(true));
  document.querySelector('main').appendChild(fragment);

  var errorMessage = document.querySelector('main .error');

  var removeMessage = function (evt) {
    if (evt.target.classList.contains(messageType) || evt.target.classList.contains(messageType + '__button') || evt.keyCode === window.util.ESC_KEYCODE) {
      errorMessage.remove();
    }
  };

  errorMessage.addEventListener('click', removeMessage);
  document.addEventListener('keydown', removeMessage);
})();
