(function(laroux) {
    "use strict";

    // requires $l.helpers
    // requires $l.dom

    // css
    laroux.css = {
        // class features
        hasClass: function(element, className) {
            return element.classList.contains(className);
        },

        addClass: function(element, className) {
            var elements = laroux.helpers.getAsArray(element);

            for (var i = elements.length - 1;i >= 0; i--) {
                elements[i].classList.add(className);
            }
        },

        removeClass: function(element, className) {
            var elements = laroux.helpers.getAsArray(element);

            for (var i = elements.length - 1;i >= 0; i--) {
                elements[i].classList.remove(className);
            }
        },

        toggleClass: function(element, className) {
            var elements = laroux.helpers.getAsArray(element);

            for (var i = elements.length - 1;i >= 0; i--) {
                if (elements[i].classList.contains(className)) {
                    elements[i].classList.remove(className);
                } else {
                    elements[i].classList.add(className);
                }
            }
        },

        // style features
        getProperty: function(element, styleName) {
            var style = getComputedStyle(element);
            styleName = laroux.helpers.antiCamelCase(styleName);

            return style.getPropertyValue(styleName);
        },

        setProperty: function(element, properties, value) {
            var elements = laroux.helpers.getAsArray(element);

            if (typeof properties == 'string') {
                var oldProperties = properties;
                properties = {};
                properties[oldProperties] = value;
            }

            for (var styleName in properties) {
                if (!properties.hasOwnProperty(styleName)) {
                    continue;
                }

                var newStyleName = laroux.helpers.camelCase(styleName);

                for (var i = elements.length - 1;i >= 0; i--) {
                    elements[i].style[newStyleName] = properties[styleName];
                }
            }
        },

        // transition features
        defaultTransition: '2s ease',

        setTransitionSingle: function(element, transition) {
            var transitions = laroux.helpers.getAsArray(transition);

            var style = getComputedStyle(element);
            var currentTransitions = style.getPropertyValue('transition') || style.getPropertyValue('-webkit-transition') ||
                style.getPropertyValue('-ms-transition') || '';

            var currentTransitionsArray;
            if (currentTransitions.length > 0) {
                currentTransitionsArray = currentTransitions.split(',');
            } else {
                currentTransitionsArray = [];
            }

            for (var item in transitions) {
                if (!transitions.hasOwnProperty(item)) {
                    continue;
                }

                var styleName, transitionProperties,
                    pos = transitions[item].indexOf(' ');

                if (pos !== -1) {
                    styleName = transitions[item].substring(0, pos);
                    transitionProperties = transitions[item].substring(pos + 1);
                } else {
                    styleName = transitions[item];
                    transitionProperties = laroux.css.defaultTransition;
                }

                var found = false;
                for (var j = 0; j < currentTransitionsArray.length; j++) {
                    if (currentTransitionsArray[j].trim().localeCompare(styleName) === 0) {
                        currentTransitionsArray[j] = styleName + ' ' + transitionProperties;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    currentTransitionsArray.push(styleName + ' ' + transitionProperties);
                }
            }

            var value = currentTransitionsArray.join(', ');

            element.style.transition = value;
            element.style.webkitTransition = value;
            element.style.msTransition = value;
        },

        setTransition: function(element, transition) {
            var elements = laroux.helpers.getAsArray(element);

            for (var i = elements.length - 1;i >= 0; i--) {
                laroux.css.setTransitionSingle(element, transition);
            }
        },

        show: function(element, transitionProperties) {
            if (typeof transitionProperties != 'undefined') {
                laroux.css.setTransition(element, 'opacity ' + transitionProperties);
            } else {
                laroux.css.setTransition(element, 'opacity');
            }

            laroux.css.setProperty(element, 'opacity', 1);
        },

        hide: function(element, transitionProperties) {
            if (typeof transitionProperties != 'undefined') {
                laroux.css.setTransition(element, 'opacity ' + transitionProperties);
            } else {
                laroux.css.setTransition(element, 'opacity');
            }

            laroux.css.setProperty(element, 'opacity', 0);
        },

        // measurement features
        // height of element without padding, margin and border
        height: function(element) {
            var style = getComputedStyle(element);

            return parseFloat(style.getPropertyValue('height'));
        },

        // height of element with padding but without margin and border
        innerHeight: function(element) {
            return element.clientHeight;
        },

        // height of element with padding and border but margin optional
        outerHeight: function(element, includeMargin) {
            if (typeof includeMargin == 'undefined' || includeMargin !== true) {
                return element.offsetHeight;
            }

            var style = getComputedStyle(element);
            var margins = parseFloat(style.getPropertyValue('margin-top')) +
                parseFloat(style.getPropertyValue('margin-bottom'));

            return Math.ceil(element.offsetHeight + margins);
        },

        // width of element without padding, margin and border
        width: function(element) {
            var style = getComputedStyle(element);

            return parseFloat(style.getPropertyValue('width'));
        },

        // width of element with padding but without margin and border
        innerWidth: function(element) {
            return element.clientWidth;
        },

        // width of element with padding and border but margin optional
        outerWidth: function(element, includeMargin) {
            if (typeof includeMargin == 'undefined' || includeMargin !== true) {
                return element.offsetWidth;
            }

            var style = getComputedStyle(element);
            var margins = parseFloat(style.getPropertyValue('margin-left')) +
                parseFloat(style.getPropertyValue('margin-right'));

            return Math.ceil(element.offsetWidth + margins);
        },

        aboveTheTop: function(element) {
            return element.getBoundingClientRect().bottom <= 0;
        },

        belowTheFold: function(element) {
            return element.getBoundingClientRect().top > window.innerHeight;
        },

        leftOfScreen: function(element) {
            return element.getBoundingClientRect().right <= 0;
        },

        rightOfScreen: function(element) {
            return element.getBoundingClientRect().left > window.innerWidth;
        },

        inViewport: function(element) {
            var rect = element.getBoundingClientRect();
            return !(rect.bottom <= 0 || rect.top > window.innerHeight ||
                rect.right <= 0 || rect.left > window.innerWidth);
        }
    };

})(this.laroux);
