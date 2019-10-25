'use strict';

(function() {
  var INDENT = 300;
  var header = document.querySelector('header');

  var onWondowScroll = function() {
    header.classList[document.documentElement.scrollTop > INDENT ? 'add' : 'remove']('header--scroll');
  };

  window.addEventListener('scroll', onWondowScroll);
})();
