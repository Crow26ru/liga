'use strict';

(function() {

  var thanksSlider = document.querySelector('.thanks__slider');

  if (thanksSlider) {
    var thankSlides = [].slice.call(document.querySelectorAll('.thank-item'));
    var thankSwiper = new Swiper(thanksSlider, {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      initialSlide: 1,
      autoHeight: true,
      init: false,
      pagination: {
        el: '.thanks__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'thanks__pagination-bullet',
        bulletActiveClass: 'thanks__pagination-bullet--active',
        renderBullet: function (index, className) {
          return '<button type="button" class="reset-button ' + className + '">Вперед к слайду ' + (index + 1) + '</button>';
        },
      },
      breakpoints: {
        1200: {
          slidesPerView: 'auto',
          spaceBetween: 43,
        },
      }
    });

    var changeHeightThankSlides = function() {
      thankSlides.forEach(function(item) {
        item.style.height = '';
      });

      if (window.innerWidth >= 1200) {
        thankSlides.forEach(function(item) {
          item.style.height = item.parentNode.clientHeight + 'px';
        });
      }
    };

    thankSwiper.on('init', changeHeightThankSlides);
    thankSwiper.init();

    window.addEventListener('resize', changeHeightThankSlides);
  }

})();
