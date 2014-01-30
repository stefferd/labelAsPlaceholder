/**
 * Created by Stef van den Berg
 * on 30/01/14
 *
 * This plugin is created to animate the label to placeholder. When the focus is in the input the label will animate to its original place.
 * When the field is still empty the label will go back as placeholder.
 *
 * Settings:
 *
 *  distanceLabelToInput :      29px
 *  distanceToLeft:             4px
 *  defaultLabel:               #000000
 *  colorPlaceholder:           #999999
 *  colorLabelOnError           #990000
 */

(function ( $ ) {

    $.fn.labelAsPlaceholder = function(options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            distanceLabelToInput: '29px',
            distanceToLeft: '4px',
            defaultLabel: '#000000',
            colorPlaceholder: '#999999',
            colorLabelOnError: '#990000'
        }, options );

        return this.each(function() {

            var self = $(this);
            var colorLabel = settings.defaultLabel;

            var parent = self.parent();
            var label = parent.find('label');

            if (parent.hasClass('error')) {
                colorLabel = settings.colorLabelOnError;
            } else {
                colorLabel = settings.colorPlaceholder;
            }

            if (self.val() == '') {
                if (parent.hasClass('error')) {
                    colorLabel = settings.colorLabelOnError;
                }
                label.css('position', 'relative');
                label.animate({ top: settings.distanceLabelToInput, left: settings.distanceToLeft, color: colorLabel });
            }

            self.bind('focus', function() {
                var color = settings.defaultLabel;
                if (parent.hasClass('error')) {
                    color = settings.colorLabelOnError;
                }
                label.animate({ top: 0, color: color});
            });

            self.bind('blur', function() {
                var input = $(this);
                if (input.val() == '') {
                    var color = settings.colorPlaceholder;
                    if (parent.hasClass('error')) {
                        color = settings.colorLabelOnError;
                    }
                    label.animate({ top: settings.distanceLabelToInput, color: color});
                }
            });
        });
    };
}( jQuery ));