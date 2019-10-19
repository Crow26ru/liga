'use strict';

(function() {
  var colorThemeCheckbox = document.getElementById('color-theme');

  var onColorThemeCheckboxChange = function() {
    var isDark = colorThemeCheckbox.checked ? true : false;

    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

    localStorage.setItem('--theme', isDark ? 'dark' : 'light');
  };

  colorThemeCheckbox.addEventListener('change', onColorThemeCheckboxChange);

  if (localStorage.getItem('--theme')) {
    colorThemeCheckbox.checked = localStorage.getItem('--theme') === 'dark' ? true : false;
    onColorThemeCheckboxChange()
  }
})();
