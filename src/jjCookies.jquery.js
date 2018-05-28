/*
 *  JJ Cookie for jQuery - v1.0.0
 *
 *  @author Joel Oliveira joel@notifica.re
 *  @author Joris Verbogt joris@notifica.re
 *  copyright 2018 Notificare
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "jjCookies",
        defaults = {
            jjCookieVersion: '1.0.0'
        };

    function Plugin ( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this.init();
    }

    Plugin.prototype = {
        init: function () {

            var types = this.options.cookieConsentTypes.split('|');

            /**
             * HANDLE UI ON INIT
             */

            if (types.indexOf('s') > -1) {
                this.strictButton = new Switchery($(this.options.cookieConsentSettingsStrictClass)[0], { size: 'small' });
                this.strictButton.disable();
            }


            if (!this._getCookie(this.options.cookieConsentName)) {

                $(this.options.cookieConsentStandaloneButtonClass).hide();
                $(this.options.cookieConsentModalClass).show();


                if (types.indexOf('f') > -1) {
                    this.functionalButton = new Switchery($(this.options.cookieConsentSettingsFunctionalClass)[0], { size: 'small' });
                }

                if (types.indexOf('p') > -1) {
                    this.performanceButton = new Switchery($(this.options.cookieConsentSettingsPerformanceClass)[0], { size: 'small' });
                }

                if (types.indexOf('m') > -1) {
                    this.marketingButton = new Switchery($(this.options.cookieConsentSettingsMarketingClass)[0], { size: 'small' });
                }

                //Delete any older cookie consent cookies
                Object.keys(this._allCookies()).forEach(function(key) {
                    this._setCookie(key, "", -1);
                }.bind(this));

            } else {

                var cookie = this._getCookie(this.options.cookieConsentName).split('|');

                if (cookie.indexOf('f') > -1) {
                    $(this.options.cookieConsentSettingsFunctionalClass).attr('checked', true);
                } else {
                    $(this.options.cookieConsentSettingsFunctionalClass).attr('checked', false);
                }
                this.functionalButton = new Switchery($(this.options.cookieConsentSettingsFunctionalClass)[0], { size: 'small' });

                if (cookie.indexOf('p') > -1) {
                    $(this.options.cookieConsentSettingsPerformanceClass).attr('checked', true);
                } else {
                    $(this.options.cookieConsentSettingsPerformanceClass).attr('checked', false);
                }
                this.performanceButton = new Switchery($(this.options.cookieConsentSettingsPerformanceClass)[0], { size: 'small' });

                if (cookie.indexOf('m') > -1) {
                    $(this.options.cookieConsentSettingsMarketingClass).attr('checked', true);
                } else {
                    $(this.options.cookieConsentSettingsMarketingClass).attr('checked', false);
                }
                this.marketingButton = new Switchery($(this.options.cookieConsentSettingsMarketingClass)[0], { size: 'small' });

                //Done init let's trigger event
                setTimeout(function(){
                    $(this.element).trigger("jjCookies:didChangeCookieSettings", this._getCookie(this.options.cookieConsentName));
                }.bind(this), 1000);

            }




            /**
             * HANDLE BUTTONS
             */
            $(this.options.cookieConsentSettingsButtonClass).click(function(){
                $(this.options.cookieConsentModalClass).hide();
                $(this.options.cookieConsentStandaloneButtonClass).show();

                //Save cookie settings

                var settings = ['s'];

                if ($(this.options.cookieConsentSettingsFunctionalClass).is(':checked')) {
                    settings.push('f');
                }

                if ($(this.options.cookieConsentSettingsPerformanceClass).is(':checked')) {
                    settings.push('p');
                } else {
                    //Delete any ga cookies in our domain
                    Object.keys(this._allCookies()).forEach(function(key) {
                        if (key != this.options.cookieConsentName) {
                            this._setCookie(key, "", -1);
                        }
                    }.bind(this));
                }

                if ($(this.options.cookieConsentSettingsMarketingClass).is(':checked')) {
                    settings.push('m');
                }

                var cookie = settings.toString().replace(/,/g, '|');
                this._setCookie(this.options.cookieConsentName, cookie, 9999);

                $(this.element).trigger("jjCookies:didChangeCookieSettings", cookie);


            }.bind(this));

            $(this.options.cookieConsentStandaloneButtonClass).click(function(){
                $(this.options.cookieConsentModalClass).show();
                $(this.options.cookieConsentStandaloneButtonClass).hide();

            }.bind(this));


        },

        isEnabled: function(type){
            var cookie = this._getCookie(this.options.cookieConsentName).split('|');

            if (cookie.indexOf(type) > -1) {
                return true;
            } else {
                return false;
            }

        },

        _allCookies: function(){
            var cookies = { };

            if (document.cookie && document.cookie != '') {
                var split = document.cookie.split(';');
                for (var i = 0; i < split.length; i++) {
                    var name_value = split[i].split("=");
                    name_value[0] = name_value[0].replace(/^ /, '');
                    cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
                }
            }

            return cookies;
        },

        _getCookie: function(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        },

        _setCookie: function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            var domain = window.location.hostname;
            document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + domain +  ";path=/";
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {

        // If the first parameter is a string, treat this as a call to
        // a public method.
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function() {
                // Check that the element has a plugin instance, and that
                // the requested public method exists.

                if ($.data(this, pluginName) && typeof $.data(this, pluginName)[methodName] === 'function') {
                    // Call the method of the Plugin instance, and Pass it
                    // the supplied arguments.

                    var plugin =  $.data(this, pluginName);
                    returnVal = plugin[methodName].apply(plugin, args);

                } else {
                    throw new Error('Method ' +  methodName + ' does not exist on ' + pluginName + '.jquery.js');
                }
            });
            if (returnVal !== undefined){
                // If the method returned a value, return the value.
                return returnVal;
            } else {
                // Otherwise, returning 'this' preserves chainability.
                return this;
            }
            // If the first parameter is an object (options), or was omitted,
            // instantiate a new instance of the plugin.
        } else if (typeof options === "object" || !options) {
            return this.each(function() {
                if ( !$.data( this, pluginName ) ) {
                    $.data( this, pluginName, new Plugin( this, options ) );
                }
            });
        }

    };

})( jQuery, window, document );