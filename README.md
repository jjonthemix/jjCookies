# jjCookies
Very simple plugin to help your website users opt-in and opt-out for different types of cookies

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with npm)
* [Grunt.js](https://gruntjs.com/)

## Installation

* `git clone https://github.com/jjonthemix/jjCookies.git` (this repository)
* `cd jjCookies`
* `npm install`

## Running / Development

* Running local server
* `node server`
* Visit your app at [http://localhost:5678](http://localhost:5678).

### Building

* `grunt watch`


### Implement

```
var cookies = $('body').jjCookies({
   cookieConsentName: "NAME_FOR_THE_CONSENT_COOKIE",
   cookieConsentTypes: "s|f|p|m",
   cookieConsentModalClass: ".cookie-manager",
   cookieConsentModalTitleClass: ".cookie-manager-title",
   cookieConsentModalTextClass: ".cookie-manager-text",
   cookieConsentSettingsClass: ".cookie-manager-settings",
   cookieConsentSettingsStrictClass: ".cookie-manager-settings-strict",
   cookieConsentSettingsFunctionalClass: ".cookie-manager-settings-functional",
   cookieConsentSettingsPerformanceClass: ".cookie-manager-settings-performance",
   cookieConsentSettingsMarketingClass: ".cookie-manager-settings-marketing",
   cookieConsentSettingsButtonClass: ".cookie-manager-settings-save-button",
   cookieConsentStandaloneButtonClass: ".cookie-manager-button"
});

$('body').bind("jjCookies:didChangeCookieSettings", function() {

   if (cookies.jjCookies('isEnabled', 'f')) {
       //Enable all functional cookies

   }


   if (cookies.jjCookies('isEnabled', 'p')) {
       //Enable all performance cookies

   }

   if (cookies.jjCookies('isEnabled', 'm')) {
       //Enable all marketing cookies

   }

});
```
