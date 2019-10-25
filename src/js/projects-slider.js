'use strict';

(function() {

  var projectsSlider = document.querySelector('.projects__slider');

  if (projectsSlider) {
    var swiper = new Swiper(projectsSlider, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.projects__button--next',
        prevEl: '.projects__button--prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1.11,
        },
        600: {
          slidesPerView: 1,
        },
      }
    });
  }

})();
