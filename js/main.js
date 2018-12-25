'use strict';

var DATA_COUNT = 25;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Артём',
  'Игорь',
  'Ефим',
  'Ульяна',
  'Таисия',
  'Виктория'
];
var SCALE_STEP = 25;
var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var ESC_KEYCODE = 27;
var MAX_HASHTAGS = 5;
var MAX_LENGTH_HASHTAG = 20;
var MAX_LENGTH_COMMENT = 140;

var data = [];
var similarListPictures = document.querySelector('.pictures');
var listComments = document.querySelector('.social__comments');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var commentTemplate = document.querySelector('.social__comment');
var bigPicture = document.querySelector('.big-picture');
var uploadFile = document.getElementById('upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
var commentInput = imgUploadOverlay.querySelector('.text__description');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scale = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');

var random = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var getComments = function () {
  var comments = [];
  var num = random(1, 100);
  for (var i = 0; i < num; i++) {
    var comment = {
      avatar: 'img/avatar-' + random(1, 6) + '.svg',
      message: MESSAGES[random(0, 5)],
      name: NAMES[random(0, 5)]
    };
    comments.push(comment);
  }
  return comments;
};

var getDataItem = function (index) {
  var temp = {
    url: 'photos/' + (index + 1) + '.jpg',
    likes: random(15, 200),
    comments: getComments()
  };
  return temp;
};

var getData = function (num) {
  var temp = [];
  for (var j = 0; j < num; j++) {
    temp.push(getDataItem(j));
  }
  return temp;
};

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

var getCommentElement = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

var showBigPicture = function (descriptions) {
  var pictureCancel = bigPicture.querySelector('.big-picture__cancel');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = descriptions.url;
  bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
  bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;

  pictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  document.addEventListener('keydown', onBigPictureEscPress);

  renderComments(descriptions.comments);
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(getCommentElement(comments[i]));
  }

  while (listComments.firstChild) {
    listComments.removeChild(listComments.firstChild);
  }

  listComments.appendChild(fragment);
};

var renderPictures = function (descriptions) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < descriptions.length; i++) {
    fragment.appendChild(getPictureElement(descriptions[i]));
  }

  similarListPictures.appendChild(fragment);
};

data = getData(DATA_COUNT);

renderPictures(data);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  applyEffect(100);
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

var effectsElement = document.querySelector('.effects');

effectsElement.addEventListener('change', function () {
  applyEffect(100);
});

var setFilterValue = function (value) {
  var currentEffect = effectsElement.querySelector('input:checked').value;

  currentEffect === 'none' ? imgUploadEffectLevel.classList.add('hidden') : imgUploadEffectLevel.classList.remove('hidden');

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

var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
var line = imgUploadEffectLevel.querySelector('.effect-level__line');
var pin = imgUploadEffectLevel.querySelector('.effect-level__pin');
var depth = imgUploadEffectLevel.querySelector('.effect-level__depth');

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
