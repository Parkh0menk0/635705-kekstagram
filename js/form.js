'use strict';

(function () {
  var DEFAULT_EFFECT_VALUE = 100;
  var SCALE_STEP = 25;
  var MAX_SCALE_VALUE = 100;
  var MIN_SCALE_VALUE = 25;
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_LENGTH_COMMENT = 140;

  var uploadFile = document.getElementById('upload-file');
  var form = document.querySelector('.img-upload__form');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
  var commentInput = imgUploadOverlay.querySelector('.text__description');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scale = document.querySelector('.scale__control--value');
  var effectsElement = document.querySelector('.effects');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
  var line = imgUploadEffectLevel.querySelector('.effect-level__line');
  var pin = imgUploadEffectLevel.querySelector('.effect-level__pin');
  var depth = imgUploadEffectLevel.querySelector('.effect-level__depth');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    applyEffect(DEFAULT_EFFECT_VALUE);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  imgUploadCancel.addEventListener('click', function () {
    closePopup();
  });

  var scaleble = function (scaleValue) {
    return 'scale(' + scaleValue.replace('%', '') / 100 + ')';
  };

  scale.value = 100;

  scaleControlSmaller.addEventListener('click', function () {
    var value = Number(scale.value.replace('%', ''));
    if (value === MIN_SCALE_VALUE) {
      return;
    }
    scale.value = (value - SCALE_STEP) + '%';
    imgUploadPreview.style.transform = scaleble(scale.value);
  });

  scaleControlBigger.addEventListener('click', function () {
    var value = Number(scale.value.replace('%', ''));
    if (value === MAX_SCALE_VALUE) {
      return;
    }
    scale.value = (value + SCALE_STEP) + '%';
    imgUploadPreview.style.transform = scaleble(scale.value);
  });

  hashtagInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var value = target.value.replace(/\s+/g, ' ').trim().toLowerCase();
    var hashArr = value.split(' ');
    var hashArr2 = value.split('#').slice(1);
    var errorMessage = '';

    if (hashArr.length > MAX_HASHTAGS) {
      /* нельзя указать больше пяти хэш-тегов; */
      errorMessage = 'Хеш-тегов может быть не более 5-ти';
    } else {
      for (var i = 0; i < hashArr.length; i++) {
        var hashtag = hashArr[i];
        var hashtagsBefore = hashArr.slice(0, Math.max(0, i));
        /* один и тот же хэш-тег не может быть использован дважды; */
        if (hashtagsBefore.indexOf(hashtag) > -1) {
          errorMessage = 'Не может быть двух одинаковых тегов';
          break;
        }
        if (hashtag.length > MAX_LENGTH_HASHTAG) {
          /* максимальная длина одного хэш-тега 20 символов, включая решётку;*/
          errorMessage = 'Хеш-теги не могут быть больше 20-ти символов';
          break;
        } else if ((hashtag.length === 1) && (hashtag[0] === '#')) {
          /* хеш-тег не может состоять только из одной решётки;*/
          errorMessage = 'Хеш-теги не могут состоять из одной решетки';
          break;
        } else if ((hashtag[0] !== '#') && (hashtag.length > 0)) {
          /* хэш-тег начинается с символа # (решётка);*/
          errorMessage = 'Первый символ у хеш-тега должен быть решеткой';
          break;
        } else if ((hashArr.length !== hashArr2.length) && (hashArr[0] !== '')) {
          /* второе условие добавлено на тот случай когда пользователь
          сначала начал вводить теги, а потом удалил, в этом случае событие вызывается и массивы оказываются разной
          длины, в первом оказывается пустой элемент */
          /* хэш-теги разделяются пробелами; */
          errorMessage = 'Разделяйте хеш-теги пробелами';
        }
      }
    }

    target.setCustomValidity(errorMessage);
  });

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  commentInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var errorMessage = '';
    if (target.length > MAX_LENGTH_COMMENT) {
      /* максимальная длина одного комментария 140 символов;*/
      errorMessage = 'Комментарии не могут быть больше 140-ти символов';
    }

    target.setCustomValidity(errorMessage);
  });

  commentInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  commentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  effectsElement.addEventListener('change', function () {
    applyEffect(DEFAULT_EFFECT_VALUE);
  });

  var setFilterValue = function (value) {
    var currentEffect = effectsElement.querySelector('input:checked').value;

    if (currentEffect === 'none') {
      imgUploadEffectLevel.classList.add('hidden');
    } else {
      imgUploadEffectLevel.classList.remove('hidden');
    }

    switch (currentEffect) {
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + (value) / 100 + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + (value) / 100 + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + value + '%)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + (value) * 3 / 100 + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + (value) * 3 / 100 + ')';
        break;
      default:
        imgUploadPreview.style.filter = 'none';
        break;
    }
  };

  var setEffectValue = function (value) {
    pin.style.left = value + '%';
    depth.style.width = value + '%';
    effectLevelValue.value = value;
  };

  var applyEffect = function (value) {
    setFilterValue(value);
    setEffectValue(value);
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;
    /* Для получения текущего используемого значения свойства, используется метод window.getComputedStyle.
    Полученное строковое значение функцией parseInt() возвращается в десятичной системе счисления в переменную
    sliderWidth. */
    var sliderWidth = parseInt(window.getComputedStyle(line).width, 10); // или var sliderWidth = line.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      var scaleValue = (pin.offsetLeft - shift) / sliderWidth * 100;
      scaleValue = Math.max(0, Math.min(100, scaleValue));

      applyEffect(scaleValue);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onSucces = function () {
    imgUploadOverlay.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onSucces);
  });
})();
