'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var errorElement = errorTemplate.cloneNode(true);
  document.querySelector('body').appendChild(errorElement);
})();
