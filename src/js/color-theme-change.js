'use strict';

(function() {
  var LIGHT_THEME_COLORS = [
    '--dark-color: #000000',
    '--white-color: #ffffff',
    '--light-color: #ffffff',
    '--dekor-color: #2c39f2',
    '--invers-dekor-color: #ff1553',
    '--intro-text-color: #2c39f2;',
    '--blue-color: #2c39f2',
    '--pink-color: #ff1553',
    '--gray-light-color: #f2f2f2',
    '--gray-dark-color: #d3d3d3'
  ];
  var DARK_THEME_COLORS = [
    '--dark-color: #ffffff',
    '--white-color: #ffffff',
    '--light-color: #1f1f1f',
    '--dekor-color: #ff1553',
    '--invers-dekor-color: #2c39f2',
    '--intro-text-color: #ffffff;',
    '--blue-color: #2c39f2',
    '--pink-color: #ff1553',
    '--gray-light-color: #f2f2f2',
    '--gray-dark-color: #d3d3d3'
  ];
  var colorThemeCheckbox = document.getElementById('color-theme');
  var styleBlock = document.createElement('style');
  var colorThemeIdentifier = document.querySelector('.color-theme-identifier');
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  var isIE = !!document.documentMode;
  var isFireFox = navigator.userAgent.search("Firefox");

  if (isChrome || isSafari || isFireFox) {
    /**
     * У нас есть элемент, которому мы через @ media (prefers-color-scheme: dark) навешиваем position: fixed
     * Следовательно, если у него фиксированное позиционирование, то у пользователя включена темная тема
     * И мы переключаем сайт на темную тему
     * Поддержка этого медизапроса работает только в хроме, сафари и firefox
     * https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme
     */
    if (window.getComputedStyle(colorThemeIdentifier).position === 'fixed') {
      localStorage.setItem('--theme', 'dark');
    }
  }

  var onColorThemeCheckboxChange = function() {
    var isDark = colorThemeCheckbox.checked ? true : false;

    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

    localStorage.setItem('--theme', isDark ? 'dark' : 'light');
  };

  var changeColorIE = function() {
    /**
     * полифилл следит за тегами style с помощью mutationObserver
     * удаляя и возвращая тег style, мы заставляем полифилл "пересчитывать" css-переменные
     */
    if (document.querySelector('.cssvars-style')) {
      document.head.removeChild(document.querySelector('.cssvars-style'));
    }

    var isDark = colorThemeCheckbox.checked ? true : false;

    var optionsColorTheme = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

    styleBlock.classList.add('cssvars-style');
    styleBlock.innerHTML = ':root{' + optionsColorTheme.join(';') + '}';
    document.head.appendChild(styleBlock);

    onColorThemeCheckboxChange();
  };

  var functionChangeColor = isIE ? changeColorIE : onColorThemeCheckboxChange;

  colorThemeCheckbox.addEventListener('change', functionChangeColor);

  if (localStorage.getItem('--theme')) {
    colorThemeCheckbox.checked = localStorage.getItem('--theme') === 'dark' ? true : false;
    functionChangeColor();
  }
})();
