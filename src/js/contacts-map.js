'use strict';

(function () {
  var mapContainer = document.querySelector('.contacts__map-container');

  if (mapContainer) {

    var setMapHeight = function () {
      if (window.innerWidth < 768) {
        mapContainer.setAttribute('style', 'width: 100%; height: 219px');
      } else {
        mapContainer.setAttribute('style', 'width: 100%; height: 470px')
      }
    };

    setMapHeight();

    window.addEventListener('resize', setMapHeight);
  }
})();
