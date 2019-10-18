'use strict';

(function() {
  try {
    cssVars({
      watch: true
    });
  } catch (error) {
    // На случай, если скрипт-инициатор полифилла загрузится раньше самого полифилла
    if (error.name === 'ReferenceError') {
      var timerId = setInterval(function() {
        if (cssVars) {
          cssVars({
            watch: true
          });

          clearInterval(timerId);
        }
      }, 100);
    }
  }
})();
