'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  var onPopupEscPress = function (action, keyCode) {
    return (function (evt) {
      if (evt.keyCode === keyCode) {
        action();
      }
    });
  };

  var successClose = function () {
    document.removeEventListener('keydown', onSuccessEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .success'));
  };

  var errorClose = function () {
    document.removeEventListener('keydown', onErrorEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .error'));
  };

  var onSuccessEscPress = onPopupEscPress(successClose, window.util.ESC_KEYCODE);
  var onErrorEscPress = onPopupEscPress(errorClose, window.util.ESC_KEYCODE);

  var openSuccess = function () {
    var message = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(message);
    var button = message.querySelector('.success__button');

    button.addEventListener('click', function () {
      successClose();
    });

    document.addEventListener('keydown', onSuccessEscPress);
  };

  var openError = function () {
    var message = templateError.cloneNode(true);
    document.querySelector('main').appendChild(message);
    var button = message.querySelectorAll('.error__button');

    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener('click', function () {
        errorClose();
      });
    }
    document.addEventListener('keydown', onErrorEscPress);
  };

  window.validation = {
    openSuccess: openSuccess,
    openError: openError
  };
})();
