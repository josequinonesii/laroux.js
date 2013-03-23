(function(laroux) {
    // "use strict";

    // ui
    laroux.ui = {
        floatContainer: null,

        createFloatContainer: function() {
            if (!laroux.ui.floatContainer) {
                laroux.ui.floatContainer = laroux.dom.createElement('DIV', { id: 'laroux_floatdiv' }, '');
                document.body.insertBefore(laroux.ui.floatContainer, document.body.firstChild);
            }
        },

        createBox: function(id, xclass, message) {
            return laroux.dom.createElement('DIV', { id: id, class: xclass },
                message
            );
        },

        msgbox: function(timeout, message) {
            var id = laroux.helpers.getUniqueId();
            laroux.ui.floatContainer.appendChild(laroux.ui.createBox(id, 'laroux_msgbox', message));

            var obj = laroux.dom.select('#' + id);
            laroux.css.setProperty(obj, 'opacity', '1');

            laroux.timers.set(timeout, function(x) {
                laroux.css.setProperty(x, 'opacity', '0');
            }, obj);
        }
    };

    laroux.ready(laroux.ui.createFloatContainer);

    laroux.popupFunc = function(message) {
        laroux.ui.msgbox(5, message);
    };

})(window.laroux);
