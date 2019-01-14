'use strict';

(function () {
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');
  var templateError = document.querySelector('#error').content.querySelector('.error');

  /**
   * Функция закрывающая попап по нажатию клавиши esc
   * @function
   * @param {requestCallback} action функция закрывающая попап успешной загрузки (или ошибки) изображения;
   * @param {Number} keyCode численное представление клавиши esc;
   * @return {requestCallback}
   */
  var onPopupEscPress = function (action, keyCode) {
    return (function (evt) {
      if (evt.keyCode === keyCode) {
        action();
      }
    });
  };

  /**
   * Функция закрывающая попап успешной загрузки изображения.
   * @function
   */
  var successClose = function () {
    document.removeEventListener('click', onSuccessAnotherClick);
    document.removeEventListener('keydown', onSuccessEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .success'));
  };

  /**
   * Функция закрывающая попап ошибки загрузки изображения.
   * @function
   */
  var errorClose = function () {
    document.removeEventListener('click', onErrorAnotherClick);
    document.removeEventListener('keydown', onErrorEscPress);
    document.querySelector('main').removeChild(document.querySelector('main .error'));
  };

  var onSuccessEscPress = onPopupEscPress(successClose, window.util.ESC_KEYCODE);
  var onErrorEscPress = onPopupEscPress(errorClose, window.util.ESC_KEYCODE);

  /**
   * Функция обработки успешной загрузки изображения: показывает сообщение об
   * успешной загрузке изображения в блоке main, используя блок #succes из шаблона template.
   * @function
   */
  var openSuccess = function () {
    var message = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(message);
    var button = message.querySelector('.success__button');

    button.addEventListener('click', function () {
      successClose();
    });

    document.addEventListener('click', onSuccessAnotherClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  /**
   * Функция обработки возможных ошибок при загрузке: показывает сообщение об
   * ошибке в блоке main, используя блок #error из шаблона template.
   * @function
   * @param {String} errorMessage сообщение об ошибке;
   */
  var openError = function (errorMessage) {
    var message = templateError.cloneNode(true);
    message.querySelector('.error__title').textContent = errorMessage;
    document.querySelector('main').appendChild(message);
    var buttons = message.querySelectorAll('.error__button');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        errorClose();
      });
    }
    document.addEventListener('click', onErrorAnotherClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var onSuccessAnotherClick = function (evt) {
    var successInner = document.querySelector('main').querySelector('.success__inner');
    if (evt.target !== successInner) {
      successClose();
    }
  };

  var onErrorAnotherClick = function (evt) {
    var errorInner = document.querySelector('main').querySelector('.error__inner');
    if (evt.target !== errorInner) {
      errorClose();
    }
  };

  window.notification = {
    openSuccess: openSuccess,
    openError: openError
  };
})();
