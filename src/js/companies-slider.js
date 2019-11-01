'use strict';

(function () {
  var companies = document.querySelector('.companies');

  if (companies) {
    var toggle = companies.querySelector('.companies__all');
    var sliderWrapper = companies.querySelector('.companies__slider-wrapper');
    var swiperContainer = companies.querySelector('.swiper-container');
    var companiesList = companies.querySelector('ul');

    var swiperSettings = {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      speed: 500,
      centeredSlides: true,

      breakpoints: {
        768: {
          spaceBetween: 90,
        }
      }
    };

    var isInViewport = function (elem) {
      var bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    var swiper = new Swiper(swiperContainer, swiperSettings);

    var onWindowScroll = function() {
      if(!companies.classList.contains('companies--open')) {
        if (isInViewport(sliderWrapper)) {
          var st = window.pageYOffset || document.documentElement.scrollTop;
          {
            if (st > lastScrollTop) {
              // downscroll code
              swiper.slideNext();
            } else {
              // upscroll code
              swiper.slidePrev();
            }
          }
          lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }
      }
    };

    toggle.addEventListener('click', function (evt) {
      evt.preventDefault();
      swiper.destroy();
      companies.classList.add('companies--open');
      companiesList.classList.add('container');
      window.removeEventListener('scroll',  onWindowScroll);
    });


    window.addEventListener('scroll',  onWindowScroll);
  }

})();
