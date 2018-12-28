'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    Добавил функцию load.js, которая загружает данные по сети и вызывает функцию onSuccess, если данные загружены успешно, и onError, если что-то пошло не так
  };

  window.backend = {
    upload = upload,
    load = load
  };
})();
