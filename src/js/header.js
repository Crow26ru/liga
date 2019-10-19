'use strict';

(function() {
  var OPEN_HEADER_CLASS_NAME = 'header-open';
  var NAVIGATION_WRAP_CLASS_NAME = 'header-open';
  var burgerButton = document.querySelector('.navigation__burger');
  var html = document.querySelector('html');
  var scrollTop = 0;

  var openHeader = function(e) {
    e.stopPropagation();

    html.classList.add(OPEN_HEADER_CLASS_NAME);

    burgerButton.removeEventListener('click', openHeader);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
    burgerButton.addEventListener('click', closeHeader);

    scrollTop = window.pageYOffset;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
  };

  var closeHeader = function() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.height = '';
    document.body.style.width = '';
    window.scroll(0, scrollTop);

    html.classList.remove(OPEN_HEADER_CLASS_NAME);

    burgerButton.addEventListener('click', openHeader);
    burgerButton.removeEventListener('click', closeHeader);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  var onDocumentKeydown = function(e) {
    if (e.keyCode === 27) {
      closeHeader();
    }
  };

  var onDocumentClick = function(e) {
    if (!e.target.closest('.' + NAVIGATION_WRAP_CLASS_NAME)) {
      closeHeader();
    }
  };

  burgerButton.addEventListener('click', openHeader);
})();
