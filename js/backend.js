'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  /**
   * Функция создания объекта XMLHttpReques.
   * @function
   * @param {requestCallback} onLoad функция обратного вызова, которая срабатывает при успешном выполнении запроса;
   * @param {requestCallback} onError функция обратного вызова, которая срабатывает при неуспешном выполнении запроса;
   * @return {Object} объект XMLHttpRequest.
   */
  var createXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  /**
   * Функция для отправки данных на сервер.
   * @function
   * @param {object} data - объект FormData, который содержит данные формы, которые будут отправлены на сервер;
   * @param {requestCallback} onLoad функция обратного вызова, которая срабатывает при успешном выполнении запроса;
   * @param {requestCallback} onError функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   */
  var upload = function (data, onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  /**
   * Функция получения данных с сервера.
   * @function
   * @param {requestCallback} onLoad функция обратного вызова, которая срабатывает при успешном выполнении запроса;
   * @param {requestCallback} onError функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   */
  var load = function (onLoad, onError) {
    var xhr = createXHR(onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
