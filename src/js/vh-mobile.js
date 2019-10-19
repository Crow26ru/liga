'use strict';

(function () {
  var onWindowResize = function() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  };

  window.addEventListener('resize', onWindowResize);
  onWindowResize();
})();

