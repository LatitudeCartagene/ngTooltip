(function() {
  'use strict';

  /**
   * Register directive
   */
  angular
    .module('ngTooltip', [])
    .directive('tooltip', tooltip);

  /**
   * Directive code
   * @return {Object} our directive
   */
  function tooltip($rootScope) {
    var directive = {
      restrict: 'A',
      link: link
    }

    return directive;

    function link(scope, element, attrs) {
      var tooltip, container, span, arrow = {};

      // Events
      var enter, leave, move;

      // Hide the tip and remove events
      scope.$on('ngTooltip:hide', function() {
        leave();
        element.off('mouseenter');
        element.off('mouseleave');
        element.off('mousemove');
      });

      // Hide the tip and remove events
      scope.$on('ngTooltip:show', function() {
        leave(); // Juste destroy the current info even if it should be hidden
        element.on('mouseenter', enter);
        element.on('mouseleave', leave);
        element.on('mousemove', move);
      });

      // Mouseenter event
      enter = function() {
        container = angular
          .element('<div></div>')
          .addClass('tooltip')
          .append('<span>' + attrs.tooltip + '</span><div class="arrow"></div>');
        $('body').append(container);

        tooltip = angular
          .element(container)[0];
        span = tooltip.querySelector('span');
        arrow = tooltip.querySelector('.arrow');

        // Correct arrow left position
        arrow.style.left = +$(span).width() / 2 + 'px';

        // Set the span width to avoid resize of window's edges
        span.style.width = +$(span).width() + 15 + 'px';
      };

      // Mouseleave event
      leave = function() {
        // Let's destroy the tooltip
        $('body')
          .find(container)
          .remove();
        tooltip, container, span, arrow = {};
      };

      // Mousemove event
      move = function (e) {
        // Retrieve the mouse position and update the tooltip coordinates
        var x = (e.clientX - +$(span).width() / 2 - 5) + 'px',
            y = (e.clientY - 45) + 'px';

        tooltip.style.display = 'block';
        tooltip.style.width = +$(span).width() + 15 +'px';
        tooltip.style.top = y;
        tooltip.style.left = x;
      };

      // Register events
      element.on('mouseenter', enter);
      element.on('mouseleave', leave);
      element.on('mousemove', move);
    }
  }
})();
