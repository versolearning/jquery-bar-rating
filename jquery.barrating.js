/**
 * jQuery Bar Rating Plugin
 *
 * http://github.com/netboy/jquery-bar-rating
 *
 * Copyright (c) 2012 Kazik Pietruszewski
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    var methods = {
        init:function (userOptions) {

            var defaults = {
                    showValues:false,
                    showSelectedRating:true
                },
                hasTouch = 'ontouchstart' in window,
                clickEvent = hasTouch ? 'touchstart' : 'click';

            userOptions = $.extend(defaults, userOptions);

            return this.each(function () {
                var $this = $(this),
                    data = $this.data('barrating'),
                    $widget,
                    $all,
                    updateRating;

                $this.data('barrating', {
                    initialized:true,
                    currentRating:$this.val() // initial rating based on the OPTION value
                });

                // run only once
                if (!data || data.initialized === false) {
                    $widget = $('<div />', { 'class':'bar-rating' }).insertAfter(this);

                    // create A elements that will replace OPTIONs
                    $(this).find('option').each(function () {
                        var val, aText, $a, $span;

                        val = $(this).text();
                        aText = (userOptions.showValues) ? val : '';
                        $a = $('<a />', { href:'#', 'data-rating':val });
                        $span = $('<span />', { text:aText });

                        $widget.append($a.append($span));

                    });

                    if (userOptions.showSelectedRating) {
                        $widget.append($('<div />', { text:'', 'class':'current-rating' }));

                        // update text on rating change
                        $widget.find('.current-rating').on('ratingchange',
                            function () {
                                $(this).text($this.data('barrating').currentRating);
                            }).trigger('ratingchange');

                    }

                    // will be reused later
                    updateRating = function () {

                        // some rating was already selected?
                        if ($this.data('barrating').currentRating !== undefined) {
                            $widget.find('a[data-rating="' + $this.data('barrating').currentRating + '"]')
                                .addClass('selected current')
                                .prevAll().addClass('selected');
                        }
                    };

                    updateRating();

                    $all = $widget.find('a');

                    // make sure click event doesn't cause trouble on touch devices
                    if (hasTouch) {
                        $all.on('click', function (event) {
                            event.preventDefault();
                        });
                    }

                    $all.on(clickEvent, function (event) {
                        var $a = $(this);

                        event.preventDefault();

                        $all.removeClass('active selected current');
                        $a.addClass('selected current')
                            .prevAll().addClass('selected');

                        // remember selected rating
                        $this.data('barrating').currentRating = $a.attr('data-rating');

                        // change selected OPTION in the select box (now hidden)
                        $this.val($a.attr('data-rating'));

                        $widget.find('.current-rating').trigger('ratingchange');

                        return false;

                    });

                    // attach mouseenter/mouseleave event handlers
                    if (!hasTouch) {

                        $all.on({
                            mouseenter:function () {
                                var $a = $(this);
                                $all.removeClass('active').removeClass('selected');
                                $a.addClass('active').prevAll().addClass('active');
                            }
                        });

                        $widget.on({
                            mouseleave:function () {
                                $all.removeClass('active');
                                updateRating();
                            }
                        });
                    }

                    // hide the select box
                    $this.hide();
                }
            });
        },
        destroy:function () {
            return this.each(function () {
                var $this = $(this);

                $this.removeData('barrating');
                $('.bar-rating, .bar-rating a').off().remove();

                // show the select box
                $this.show();

            });
        }
    };

    $.fn.barrating = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.barrating');
        }

    };

})(jQuery);